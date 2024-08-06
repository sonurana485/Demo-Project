import React from 'react';
import './InfoSidebar.css';

const InfoSidebar = () => {
  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    // Handle the uploaded file here (e.g., send it to the server or display it)
    console.log(file);
  };

  return (
    <aside className="info-sidebar">
      <div className="info-box">
        <h3>New to GetWork?</h3>
        <div className="resume-section">
          <label htmlFor="resume-upload" className="upload-button">Upload Resume
          <p>Connect with Hiring Experts</p>
          </label>
          <input type="file" id="resume-upload" onChange={handleResumeUpload} style={{ display: 'none' }} />
          
        </div>
      </div>
      <div className="info-box">
        <h3>Launch Your Career</h3>
        <p>
          with GetWork OneApp<br />
          Search, find, apply and track for the latest job on the go!
        </p>
      </div>
    </aside>
  );
};

export default InfoSidebar;
