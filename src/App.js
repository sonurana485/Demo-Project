import React, { useState, useEffect } from 'react';
import TopNav from './TopNav';
import Header from './Header/Header';
import FilterSidebar from './FilterSidebar/FilterSidebar';
import JobList from './JobList/JobList';
import InfoSidebar from './InfoSidebar/InfoSidebar';
import './App.css'; 


const App = () => {
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedJobRole, setSelectedJobRole] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedSalary, setSelectedSalary] = useState('');
  const [selectedWFH, setSelectedWFH] = useState('');

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
  };

  useEffect(() => {
    console.log("Selected Company is", selectedCompany);
  }, [selectedCompany]);

  const handleDomainSelect = (domain) => {
    setSelectedDomain(domain);
  };

  const handleJobRoleSelect = (jobrole) => {
    setSelectedJobRole(jobrole);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  const handleIndustrySelect = (industry) => {
    setSelectedIndustry(industry);
  };
  
  const handleJobTypeSelect = (jobtype) => {
    setSelectedJobType(jobtype);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleExperienceSelect = (experience) => {
    setSelectedExperience(experience);
  };

  const handleSalarySelect = (salary) => {
    setSelectedSalary(salary);
  };

  const handleWFHSelect = (wfh) => {
    setSelectedWFH(wfh);
  };

  const handleClearFilters = () => {
    setSelectedCompany('');
    setSelectedDomain('');
    setSelectedJobRole('');
    setSelectedLocation('');
    setSelectedIndustry('');
    setSelectedJobType('');
    setSelectedCategory('');
    setSelectedExperience('');
    setSelectedSalary('');
    setSelectedWFH('');
  };

  return (
    <div className="app">
      <TopNav />
      <Header />
      <div className="main-content">
        <FilterSidebar 
          onCompanySelect={handleCompanySelect} 
          onDomainSelect={handleDomainSelect} 
          onJobRoleSelect={handleJobRoleSelect} 
          onLocationSelect={handleLocationSelect} 
          onIndustrySelect={handleIndustrySelect} 
          onJobTypeSelect={handleJobTypeSelect} 
          onCategorySelect={handleCategorySelect} 
          onExperienceSelect={handleExperienceSelect} 
          onSalarySelect={handleSalarySelect} 
          onWFHSelect={handleWFHSelect}
          onClearFilters={handleClearFilters} 
        />
        <JobList 
          selectedCompany={selectedCompany} 
          selectedDomain={selectedDomain} 
          selectedJobRole={selectedJobRole} 
          selectedLocation={selectedLocation} 
          selectedIndustry={selectedIndustry} 
          selectedJobType={selectedJobType} 
          selectedCategory={selectedCategory} 
          selectedExperience={selectedExperience} 
          selectedSalary={selectedSalary} 
          selectedWFH={selectedWFH}
          onClearFilters={handleClearFilters} 
        />
        <InfoSidebar />
      </div>
    </div>
  );
};

export default App;
