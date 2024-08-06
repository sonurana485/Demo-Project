import React from 'react';
import './JobCard.css';

const JobCard = ({ job }) => {
  
  return (
    <div className="job-card">
      <div className="job-card-header">
        <img src={job.company.company_logo} alt={`${job.company.company_name} logo`} className="company-logo" />
        <div className="job-card-title">
          <h4>{job.job_title}</h4>
          <h4>{job.company.company_name}</h4>
        </div>
      </div>
      <div className="job-card-details">
        <p><i className="fas fa-briefcase"></i> {job.job_type_name}</p>
        <p><i className="fas fa-briefcase"></i> {job.ctc_value}</p>
        <p><i className="fas fa-calendar-alt"></i> {job.eligibility_criteria.experience}</p>
      </div>
      <p className="wfh-status">
        <i className="fas fa-map-marker-alt"></i> {job.wfh ? 'Work from Home' : 'On-site'}
      </p>
      <p><i className="fas fa-code"></i> {job.eligibility_criteria.skills[0]?.skill_name}</p>
      <p className="job-card-date"><i className="fas fa-clock"></i> Posted {job.time_ago}</p>
    </div>
  );
};

export default JobCard;
