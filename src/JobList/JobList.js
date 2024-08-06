import React, { useState, useEffect, useRef, useCallback } from 'react';
import JobCard from '../JobCard/JobCard';
import './JobList.css';

const JobList = ({
  selectedCompany,
  selectedDomain,
  selectedJobRole,
  selectedLocation,
  selectedIndustry,
  selectedJobType,
  selectedCategory,
  selectedExperience,
  selectedSalary,
  selectedWFH,
  onClearFilters 
}) => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const observer = useRef();

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://niyuktitest2.getwork.org/job/student/job/get/?page=${page}&&job_type_id=7&&sort_by=1`);
      const data = await response.json();
      if (data.success) {
        if (page === 1) {
          setCount(data.data.count); 
        }
        setJobs(prevJobs => {
          const newJobs = page === 1 ? data.data.results : [...prevJobs, ...data.data.results];
          return newJobs.slice(0, 10 + (page - 1) * 10); 
        });
        setHasMore(data.data.next !== null);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, [page]);

  const lastJobElementRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);


  const showAllJobs = !(
    selectedCompany ||
    selectedDomain ||
    selectedJobRole ||
    selectedLocation ||
    selectedIndustry ||
    selectedJobType ||
    selectedCategory ||
    selectedExperience ||
    selectedSalary ||
    selectedWFH
  );

  
  const filteredJobs = showAllJobs ? jobs : jobs.filter(job => {
    return (
      (!selectedCompany || job.company.company_name === selectedCompany) &&
      (!selectedDomain || job.company.domain === selectedDomain) &&
      (!selectedJobRole || job.job_title === selectedJobRole) &&
      (!selectedLocation || job.job_location.city === selectedLocation) &&
      (!selectedIndustry || job.company.industry_name === selectedIndustry) &&
      (!selectedJobType || job.job_type_name === selectedJobType) &&
      (!selectedCategory || job.job_category === selectedCategory) &&
      (!selectedExperience || job.eligibility_criteria.experience === selectedExperience) &&
      (!selectedSalary || job.stipend === selectedSalary) &&
      (!selectedWFH || job.wfh === selectedWFH)
    );
  });

  // Clear filters and reset jobs
  useEffect(() => {
    if (showAllJobs && page !== 1) {
      setPage(1);
    }
  }, [showAllJobs]);

  return (
    <main className="job-list">
      <div className="job-list-header">
        <h2>{`${filteredJobs.length > 0 ? `1-${filteredJobs.length}` : 'No'} of ${count} Opportunities`}</h2>
        <select>
          <option value="Sort By Latest Jobs">Sort By Latest Jobs</option>
          <option value="Recommended for you">Sort By Recommended for you</option>
          <option value="Popular Jobs">Sort By Popular Jobs</option>
        </select>
      </div>
      {filteredJobs.length > 0 ? (
        filteredJobs.map((job, index) => (
          <div ref={index === filteredJobs.length - 1 ? lastJobElementRef : null} key={job.id}>
            <JobCard job={job} />
          </div>
        ))
      ) : (
        <p>No Job Found</p>
      )}
      {loading && <p>Loading more jobs...</p>}
    </main>
  );
};

export default JobList;
