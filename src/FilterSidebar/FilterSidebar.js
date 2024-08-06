import React, { useState, useEffect, useRef } from 'react';
import './FilterSidebar.css';

const FilterSidebar = ({ onCompanySelect, onDomainSelect, onJobRoleSelect, onLocationSelect, onIndustrySelect, onJobTypeSelect, onCategorySelect, onExperienceSelect, onSalarySelect, onWFHSelect, onClearFilters }) => {
  // Define the options arrays
  const [filters, setFilters] = useState({
    keywords: '',
    company: '',
    domain: '',
    jobRole: '',
    location: '',
    industry: '',
    jobType: [],
    category: [],
    experience: [],
    salary: [],
    workFromHome: false,
  });

  const [suggestions, setSuggestions] = useState({
    company: [],
    keyword: [],
    domain: [],
    jobRole: [],
    location: [],
    industry: []
  });

  const [visibility, setVisibility] = useState({
    company: false,
    keyword: false,
    domain: false,
    jobRole: false,
    location: false,
    industry: false
  });

  const [jobTypeVisible, setJobTypeVisible] = useState(true);
  const [categoryVisible, setCategoryVisible] = useState(true);
  const [experienceVisible, setExperienceVisible] = useState(true);
  const [salaryVisible, setSalaryVisible] = useState(true);
  const [jobTypeOptions, setJobTypeOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [experienceOptions, setExperienceOptions] = useState([]);
  const [salaryOptions, setSalaryOptions] = useState([]);

  const inputRefs = {
    company: useRef(null),
    keyword: useRef(null),
    domain: useRef(null),
    jobRole: useRef(null),
    location: useRef(null),
    industry: useRef(null)
  };

  const fetchSuggestions = async () => {
    try {
      const response = await fetch('http://niyuktitest2.getwork.org/job/student/job/filter/');
      const data = await response.json();
      if (data.success) {
        const { company, keyword, job_segment, job_role_group, location, industry, job_type, job_category, work_experience, salary } = data.data;
        setSuggestions({
          company: company.data.map(item => item.name),
          keyword: keyword.data,
          domain: job_segment.data.map(item => item.name),
          jobRole: job_role_group.data.map(item => item.name),
          location: location.data.map(item => item.name),
          industry: industry.data.map(item => item.name)
        });
        setJobTypeOptions(job_type.data.map(item => item.name));
        setCategoryOptions(job_category.data.map(item => item.name));
        setExperienceOptions(work_experience.data.map(item => item.name));
        setSalaryOptions(salary.data.map(item => item.name));
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      for (const key in inputRefs) {
        if (inputRefs[key].current && !inputRefs[key].current.contains(event.target)) {
          setVisibility((prev) => ({ ...prev, [key]: false }));
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e, filterType) => {
    const { value, checked } = e.target;
    setFilters((prevFilters) => {
      const updatedValues = checked
        ? [...prevFilters[filterType], value]
        : prevFilters[filterType].filter((item) => item !== value);

      switch (filterType) {
        case "jobType":
          onJobTypeSelect(value);
          break;
        case "category":
          onCategorySelect(value);
          break;
        case "experience":
          onExperienceSelect(value);
          break;
        case "salary":
          onSalarySelect(value);
          break;
        default:
          break;
      }

      return {
        ...prevFilters,
        [filterType]: updatedValues,
      };
    });
  };

  const toggleVisibility = (setter) => {
    setter((prevVisible) => !prevVisible);
  };

  const toggleWorkFromHome = () => {
    setFilters(prevFilters => {
      const newWFHValue = !prevFilters.workFromHome;
      onWFHSelect(newWFHValue);
      return {
        ...prevFilters,
        workFromHome: newWFHValue
      };
    });
  };


  const clearAllFilters = () => {
    setFilters({
      keywords: '',
      company: '',
      domain: '',
      jobRole: '',
      location: '',
      industry: '',
      jobType: [],
      category: [],
      experience: [],
      salary: [],
      workFromHome: '',
    });
    onCompanySelect('');
    onDomainSelect('');
    onJobRoleSelect('');
    onLocationSelect('');
    onIndustrySelect('');
    onJobTypeSelect([]);
    onCategorySelect([]);
    onExperienceSelect([]);
    onSalarySelect([]);
    onWFHSelect('');
    onClearFilters();
  };

  const removeFilter = (filterKey) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: filterKey === 'workFromHome' ? false : [],
    }));
  };

  const handleFilterClick = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    setVisibility((prev) => ({ ...prev, [name]: false }));

    // Call respective handler based on filter type
    switch (name) {
      case 'company': onCompanySelect(value); break;
      case 'domain': onDomainSelect(value); break;
      case 'jobRole': onJobRoleSelect(value); break;
      case 'location': onLocationSelect(value); break;
      case 'industry': onIndustrySelect(value); break;
      default: break;
    }
  };

  const appliedFilters = Object.entries(filters).filter(([key, value]) =>
    Array.isArray(value) ? value.length : value
  );

  return (
    <aside className="filter-sidebar">
      <div className="filter-header">
        <h3>Filter By</h3>
        {appliedFilters.length > 0 && (
          <button className="clear-all" onClick={clearAllFilters}>
            Clear All
          </button>
        )}
      </div>
      {appliedFilters.length > 0 && (
        <div className="applied-filters-container">
          <div className="applied-filters">
            {appliedFilters.map(([key, value], index) => (
              <span key={index} className="filter-chip">
                {key === 'workFromHome' && value ? 'Work From Home' : value.toString()}
                <i
                  className="fas fa-times filter-chip-close"
                  onClick={() => setFilters((prev) => ({ ...prev, [key]: key === 'workFromHome' ? false : [] }))}
                ></i>
              </span>
            ))}
          </div>
          <div className="filter-divider"></div>
        </div>
      )}
      {['keyword', 'company', 'domain', 'jobRole', 'location', 'industry'].map((type) => (
        <div className={`${type}-input-container`} key={type} ref={inputRefs[type]}>
          <label>
            {type.charAt(0).toUpperCase() + type.slice(1)}
            <i className="fas fa-angle-down label-icon"></i>
          </label>
          <div className="input-container">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              name={type}
              placeholder="Search"
              value={filters[type]}
              onChange={handleInputChange}
              onFocus={() => setVisibility((prev) => ({ ...prev, [type]: true }))}
            />
          </div>
          {visibility[type] && (
            <ul className="suggestions-list">
              {suggestions[type].filter(s => s.toLowerCase().includes(filters[type].toLowerCase())).map((item, index) => (
                <li key={index} onClick={() => handleFilterClick(type, item)}>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      <div className="job-type-container">
        <label onClick={() => toggleVisibility(setJobTypeVisible)}>
          Job Type
          <i className={`fas fa-angle-${jobTypeVisible ? 'up' : 'down'} label-icon`}></i>
        </label>
        {jobTypeVisible && (
          <div className="checkbox-container">
            {jobTypeOptions.map((option) => (
              <label key={option}>
                <input
                  type="checkbox"
                  value={option}
                  checked={filters.jobType.includes(option)}
                  onChange={(e) => handleCheckboxChange(e, 'jobType')}
                />
                {option}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="category-container">
        <label onClick={() => toggleVisibility(setCategoryVisible)}>
          Category
          <i className={`fas fa-angle-${categoryVisible ? 'up' : 'down'} label-icon`}></i>
        </label>
        {categoryVisible && (
          <div className="checkbox-container">
            {categoryOptions.map((option) => (
              <label key={option}>
                <input
                  type="checkbox"
                  value={option}
                  checked={filters.category.includes(option)}
                  onChange={(e) => handleCheckboxChange(e, 'category')}
                />
                {option}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="experience-container">
        <label onClick={() => toggleVisibility(setExperienceVisible)}>
          Experience
          <i className={`fas fa-angle-${experienceVisible ? 'up' : 'down'} label-icon`}></i>
        </label>
        {experienceVisible && (
          <div className="checkbox-container">
            {experienceOptions.map((option) => (
              <label key={option}>
                <input
                  type="checkbox"
                  value={option}
                  checked={filters.experience.includes(option)}
                  onChange={(e) => handleCheckboxChange(e, 'experience')}
                />
                {option}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="salary-container">
        <label onClick={() => toggleVisibility(setSalaryVisible)}>
          Salary
          <i className={`fas fa-angle-${salaryVisible ? 'up' : 'down'} label-icon`}></i>
        </label>
        {salaryVisible && (
          <div className="checkbox-container">
            {salaryOptions.map((option) => (
              <label key={option}>
                <input
                  type="checkbox"
                  value={option}
                  checked={filters.salary.includes(option)}
                  onChange={(e) => handleCheckboxChange(e, 'salary')}
                />
                {option}
              </label>
            ))}
          </div>
        )}
      </div>

       {/* Work From Home Toggle */}
       <div className="work-from-home-container">
        <label>
          Work From Home
          <div className="toggle-container">
            <input
              type="checkbox"
              className="toggle-input"
              checked={filters.workFromHome}
              onChange={toggleWorkFromHome}
            />
            <span className="toggle-slider"></span>
          </div>
        </label>
      </div>
    </aside>
  );
};

export default FilterSidebar;
