import React from 'react';

const TopNav = () => {
  return (
    <div className="top-nav">
      <div className="nav-links">
        <ul>
          <li className='emoloyers'>Employers</li>
          <li className='job-seekers'>Job Seekers</li>
          <li className='colleges'>Colleges</li>
        </ul>
      </div>
      <div className="recruiter-actions">
        <ul>
          <li className='recruiter'>Are you a recruiter?</li>
          <li className='post-job'><a href="/post-job">Post Job</a></li>
        </ul>
      </div>
    </div>
  );
};

export default TopNav;
