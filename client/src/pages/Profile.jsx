import React, { useEffect, useState } from "react";
import "../css/pages_css/Profile.css";
import { useProfile } from "../hooks/useProfile";
import { LoadingPage } from '../pages/LoadingPage.jsx'
import { patch_profile, post_profile } from "../functions/profile_functions.js";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

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

  const [alert, setAlert] = useState({ show: false, type: '', message: '' });


  useEffect(() => {

    if (data && data.status==true) {

      setFormData({
        name: data.prof.name,
        phone: parseInt(data.prof.phone),
        email: data.prof.email,
        adhaar: parseInt(data.prof.adhaar),
        license: data.prof.license,
        past_claims: parseInt(data.prof.past_claims),
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
    
    // Validation rules
    if (id === 'name') {
      // Only allow letters and spaces
      if (value && !/^[a-zA-Z\s]*$/.test(value)) {
        return;
      }
    }
    
    if (id === 'adhaar') {
      // Only allow numbers and max 16 digits
      if (value && (!/^\d*$/.test(value) || value.length > 16)) {
        return;
      }
    }
    
    if (id === 'license') {
      // Allow letters and numbers, max 16 characters
      if (value && (!/^[a-zA-Z0-9]*$/.test(value) || value.length > 16)) {
        return;
      }
    }
    
    if (id === 'email') {
      // Basic email format validation (alphanumeric, @, ., -, _)
      if (value && !/^[a-zA-Z0-9@._-]*$/.test(value)) {
        return;
      }
    }
    
    if (id === 'past_claims') {
      // Only allow positive numbers (0 or greater)
      if (value && (!/^\d*$/.test(value) || parseInt(value) < 0)) {
        return;
      }
    }
    
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault()

    console.log(data.status)

    if (!data.status) {
      post_profile(formData)
        .then(() => {
          setAlert({ show: true, type: 'success', message: 'Profile created successfully!' });
          setTimeout(() => setAlert({ show: false, type: '', message: '' }), 5000);
        })
        .catch((err) => {
          setAlert({ show: true, type: 'error', message: 'Failed to create profile. Please try again.' });
          setTimeout(() => setAlert({ show: false, type: '', message: '' }), 5000);
        });
    }
    else {
      patch_profile(formData)
        .then(() => {
          setAlert({ show: true, type: 'success', message: 'Profile updated successfully!' });
          setTimeout(() => setAlert({ show: false, type: '', message: '' }), 5000);
        })
        .catch((err) => {
          setAlert({ show: true, type: 'error', message: 'Failed to update profile. Please try again.' });
          setTimeout(() => setAlert({ show: false, type: '', message: '' }), 5000);
        });
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

      {alert.show && (
        <Stack sx={{ width: '100%', maxWidth: '700px', marginBottom: '20px' }} spacing={2}>
          <Alert variant="filled" severity={alert.type}>
            {alert.message}
          </Alert>
        </Stack>
      )}

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
              type="text"
              name="adharnumber"
              placeholder="xxxx xxxx xxxx xxxx"
              required
              maxLength="16"
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
              maxLength="16"
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
              min="0"
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
