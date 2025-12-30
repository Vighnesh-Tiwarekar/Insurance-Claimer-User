import React from "react";
import "../css/pages_css/Profile.css";

export const Profile = () => {
  return (
    <div className="form-container">
      <div className="profile-heading">Profile</div>

      <form className="profile-form">
        <div className="field-row">
          <div className="fields">
            <label htmlFor="name">Name</label>
            <input
              className="field-input"
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              autoFocus
            />
          </div>

          <div className="fields">
            <label htmlFor="phone">Phone No.</label>
            <input
              className="field-input"
              type="number"
              name="phone"
              placeholder="99xx99xx99"
              required
            />
          </div>
        </div>

        <div className="field-row">
          <div className="fields">
            <label htmlFor="email">Email</label>
            <input
              className="field-input"
              type="email"
              name="email"
              placeholder="exampl@mail.com"
              required
            />
          </div>

          <div className="fields">
            <label htmlFor="adharnumber">Aadhar No.</label>
            <input
              className="field-input"
              type="number"
              name="adharnumber"
              placeholder="xxxx xxxx xxxx xxxx"
              required
            />
          </div>
        </div>

        <div className="field-row">
          <div className="fields">
            <label htmlFor="veh-licence">Vehicle License No.</label>
            <input
              className="field-input"
              type="text"
              name="veh-licence"
              placeholder="AB12345678"
            />
          </div>

          <div className="fields">
            <label htmlFor="pastclaim">No. of Past Claims</label>
            <input
              className="field-input"
              type="number"
              name="pastclaim"
              placeholder="Enter no of past claims"
              required
            />
          </div>
        </div>


        <div className="fields">
          <label htmlFor="address">Address</label>
          
          <textarea className="field-input" name="address" id="address" type='text' placeholder="Enter your address" rows={5} cols={50} required></textarea>
        </div>

        {/* <div className="fields">
          <label htmlFor="address">Address</label>
          <input
            className="field-input address-input"
            type="text"
            name="address"
            placeholder="Address"
            required
          />
        </div> */}

        <button className="submit-btn">Submit</button>
      </form>
    </div>
  );
};
