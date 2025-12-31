import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import '../css/pages_css/Login.css';
import { resend_otp, sign_in, sign_up, validate_otp } from "../functions/login_functions";

const LoginForm = ({ method, setmethod, setisOTP, loginContext, navigate }) => {

  const [Mssg, setMssg] = useState('')

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!method) {   //sign in path

      sign_in(loginContext, navigate, setMssg)

    } 
    else {    // sign up path
      sign_up(setisOTP, setMssg)
    }
  };

  return (
    <div className="login-signup-form">
      <div className="login-tabs">
        <div
          className={`login-tab ${!method ? 'active' : ''}`}
          onClick={() => setmethod(0)}
        >
          Sign In
        </div>

        <div
          className={`login-tab ${method ? 'active' : ''}`}
          onClick={() => setmethod(1)}
        >
          Sign Up
        </div>
      </div>

      <div className="login-form-container">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-field">
            <div className="form-field-row">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" placeholder="Enter your email" required id="email"/>
            </div>
          </div>

          <div className="form-field">
            <div className="form-field-row">
              <label className="form-label">Password</label>
              <input className="form-input" type="password" placeholder="Enter your password" required  id="password"/>
            </div>
          </div>

          <button className="submit-btn" type="submit">
            {method ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div>
          {Mssg}
        </div>
      </div>
    </div>
  );
};

const OTPForm = ({ loginContext, navigate, setisOTP }) => {

  const [msg, setMsg] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    validate_otp(loginContext, navigate, setMsg)
  };

  const resendOTP = (e) => {
    e.preventDefault()

    resend_otp(setMsg)
  }

  const goBack = () => {

    setisOTP(false);
  }

  return (
    <div className="login-signup-form">
      <div className="otp-form-container">
        <h2 className="otp-title">Verify OTP</h2>
        <p className="otp-subtitle">Enter the code sent to your email</p>

        <form onSubmit={handleSubmit}>
          <div className="otp-field">
            <label className="form-label">Enter OTP</label>
            <input
              className="form-input"
              type="text"
              placeholder="000000"
              maxLength="6"
              required
              id="otp"
            />
          </div>

          <button className="submit-btn" type="submit">
            Verify & Continue
          </button>

          <button className="submit-btn" onClick={resendOTP}>
            Resend
          </button>

        </form>

        <div>
          {msg}
        </div>

      </div>

      <button className="border-[1.5px]" onClick={goBack}>
        Back
      </button>
    </div>
  );
};

export const Login = () => {
  const [method, setmethod] = useState(0);
  const [isOTP, setisOTP] = useState(false);

  const loginContext = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      {isOTP ? (
        <OTPForm loginContext={loginContext} navigate={navigate} setisOTP={setisOTP}></OTPForm>
      ) : (
        <LoginForm
          method={method}
          setmethod={setmethod}
          setisOTP={setisOTP}
          loginContext={loginContext}
          navigate={navigate}
        ></LoginForm>
      )}
    </>
  );
};



