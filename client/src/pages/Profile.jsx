import React, { useEffect, useState } from "react";
import "../css/pages_css/Profile.css";
import { useProfile } from "../hooks/useProfile";
import { LoadingPage } from '../pages/LoadingPage.jsx'
import { patch_profile, post_profile } from "../functions/profile_functions.js";

export const Profile = () => {

  const { data, isLoading, isError, error } = useProfile();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    adhaar: '',
    license: '',
    past_claims: '',
    address: ''
  });


  useEffect(() => {

    if (data && data.status==true) {
      setFormData({
        name: data.prof.name,
        phone: data.prof.phone,
        email: data.prof.email,
        adhaar: data.prof.adhaar,
        license: data.prof.license,
        past_claims: data.prof.past_claims,
        address: data.prof.address
      });
    }
    else {
      setFormData({
        name: '',
        phone: "",
        email: '',
        adhaar: "",
        license: '',
        past_claims: "",
        address: ''
      });
    }
  }, [data]);


  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault()

    console.log(data.status)

    if (!data.status) {
      post_profile(formData)
    }
    else {
      patch_profile(formData)
    }
  }

  if (isLoading) {
    return (
      <LoadingPage></LoadingPage>
    )
  }

  return (
    <div className="form-container">
      <div className="profile-heading">Profile</div>

      <form className="profile-form" onSubmit={handleSave}>
        <div className="field-row">
          <div className="fields">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              className="field-input"
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              autoFocus
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="fields">
            <label htmlFor="phone">Phone No.</label>
            <input
              id="phone"
              className="field-input"
              type="number"
              name="phone"
              placeholder="99xx99xx99"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="field-row">
          <div className="fields">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="field-input"
              type="email"
              name="email"
              placeholder="exampl@mail.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="fields">
            <label htmlFor="adharnumber">Aadhar No.</label>
            <input
              id="adhaar"
              className="field-input"
              type="number"
              name="adharnumber"
              placeholder="xxxx xxxx xxxx xxxx"
              required
              value={formData.adhaar}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="field-row">
          <div className="fields">
            <label htmlFor="license">Vehicle License No.</label>
            <input
              className="field-input"
              id="license"
              type="text"
              name="veh-licence"
              placeholder="AB12345678"
              value={formData.license}
              onChange={handleChange}
            />
          </div>

          <div className="fields">
            <label htmlFor="past_claims">No. of Past Claims</label>
            <input
              className="field-input"
              id="past_claims"
              type="number"
              name="pastclaim"
              placeholder="Enter no of past claims"
              required
              value={formData.past_claims}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="fields">
          <label htmlFor="address">Address</label>
          <textarea
            className="field-input"
            name="address"
            id="address"
            placeholder="Enter your address"
            rows={5}
            cols={50}
            required
            value={formData.address}
            onChange={handleChange}
          ></textarea>
        </div>

        <button className="submit-btn" type="submit" >Save</button>

      </form>

    </div>
  );
};
