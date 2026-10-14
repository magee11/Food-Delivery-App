import React, { useContext, useEffect } from "react";
import "./profile.css";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import Icon from "../../components/Icon/Icon";

const ProfilePage = () => {
  const {
    userProfile,
    updateProfile,
    setProfileImage,
    getLocation,
    setUserProfile,
  } = useContext(StoreContext);

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
  }, []);

  const saveProfile = () => {
    const profileToSave = {};
    // Filter out non-empty fields
    for (const key in userProfile) {
      if (userProfile[key]) {
        profileToSave[key] = userProfile[key];
      }
    }
    // Save filtered profile
    localStorage.setItem("userProfile", JSON.stringify(profileToSave));
    toast.success("Profile saved");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfileImage(file, URL.createObjectURL(file));
  };

  return (
    <div
      className="profile-container"
    >
      <div
        className="profile-sidebar"
      >
        <div className="profile-picture">
          {userProfile?.preview ? (
            <img src={userProfile.preview} alt="Profile" referrerPolicy="no-referrer" />
          ) : (
            <Icon name="user" size={56} strokeWidth={1.4} />
          )}
        </div>
        <label className="file-input-label">
          Upload Profile
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
          />
        </label>
      </div>

      <div
        className="profile-main"
      >
        <h1 className="section-title">Profile details</h1>
        <div className="profile-info">
          <div className="input-row">
            <input
              type="text"
              placeholder="First Name"
              className="input-half"
              value={userProfile?.firstName}
              onChange={(e) => updateProfile("firstName", e.target.value)}
            />
            <input
              type="text"
              placeholder="Second Name"
              className="input-half"
              value={userProfile?.secondName}
              onChange={(e) => updateProfile("secondName", e.target.value)}
            />
          </div>
          <div className="input-row">
            <input
              type="email"
              placeholder="Email"
              className="input-full"
              value={userProfile?.email}
              onChange={(e) => updateProfile("email", e.target.value)}
            />
          </div>
          <div className="input-row">
            <input
              type="tel"
              placeholder="Phone Number"
              className="input-full"
              value={userProfile?.phoneNumber}
              onChange={(e) => updateProfile("phoneNumber", e.target.value)}
            />
          </div>
          <div className="input-row">
            <input
              type="text"
              placeholder="Address 1"
              className="input-half"
              value={userProfile?.address1}
              onChange={(e) => updateProfile("address1", e.target.value)}
            />
            <input
              type="text"
              placeholder="Address 2"
              className="input-half"
              value={userProfile?.address2}
              onChange={(e) => updateProfile("address2", e.target.value)}
            />
          </div>
          <div className="input-row">
            <input
              type="text"
              placeholder="City"
              className="input-half"
              value={userProfile?.city}
              onChange={(e) => updateProfile("city", e.target.value)}
            />
            <input
              type="text"
              placeholder="State"
              className="input-half"
              value={userProfile?.state}
              onChange={(e) => updateProfile("state", e.target.value)}
            />
          </div>
          <div className="input-row">
            <input
              type="text"
              placeholder="Pincode"
              className="input-half"
              value={userProfile?.pincode}
              onChange={(e) => updateProfile("pincode", e.target.value)}
            />
            <input
              type="text"
              placeholder="Country"
              className="input-half"
              value={userProfile?.country}
              onChange={(e) => updateProfile("country", e.target.value)}
            />
          </div>
        </div>
        <div className="profile-actions">
          <button className="btn btn-ghost" onClick={getLocation}>
            <Icon name="pin" size={18} /> Use my location
          </button>
          <button className="btn btn-primary" onClick={saveProfile}>Save profile</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
