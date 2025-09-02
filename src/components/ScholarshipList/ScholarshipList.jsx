import { useState } from 'react';
import { Filter, Calendar, Users, DollarSign, ExternalLink } from 'lucide-react';
import styles from './ScholarshipList.module.css';

const ScholarshipList = ({ scholarships }) => {
  const [filters, setFilters] = useState({
    grade: '',
    income: '',
    category: ''
  });

  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const filteredScholarships = scholarships.filter(scholarship => {
    if (filters.grade && scholarship.eligibleGrades && !scholarship.eligibleGrades.includes(filters.grade)) {
      return false;
    }
    if (filters.income && scholarship.incomeLimit && scholarship.incomeLimit < parseInt(filters.income)) {
      return false;
    }
    if (filters.category && scholarship.category !== filters.category) {
      return false;
    }
    return true;
  });

  const formatDeadline = (deadline) => {
    const date = new Date(deadline);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Expired';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays <= 7) return `${diffDays} days left`;
    return date.toLocaleDateString();
  };

  const getDeadlineUrgency = (deadline) => {
    const date = new Date(deadline);
    const now = new Date();
    const diffDays = Math.ceil((date - now) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'expired';
    if (diffDays <= 7) return 'urgent';
    if (diffDays <= 30) return 'soon';
    return 'normal';
  };

  return (
    <div className={styles.scholarshipContainer}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h2>Scholarship Opportunities</h2>
          <p>Find financial aid opportunities that match your profile.</p>
        </div>
        
        <button 
          className={`btn btn-outline ${styles.filterToggle}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={16} />
          Filters
        </button>
      </div>

      {showFilters && (
        <div className={styles.filtersPanel}>
          <div className={styles.filtersGrid}>
            <div className="form-group">
              <label className="form-label">Education Level</label>
              <select 
                className="form-input form-select"
                value={filters.grade}
                onChange={(e) => handleFilterChange('grade', e.target.value)}
              >
                <option value="">All Levels</option>
                <option value="grade-10">Grade 10</option>
                <option value="grade-12">Grade 12</option>
                <option value="bachelor">Bachelor</option>
                <option value="master">Master</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Family Income (NPR)</label>
              <select 
                className="form-input form-select"
                value={filters.income}
                onChange={(e) => handleFilterChange('income', e.target.value)}
              >
                <option value="">Any Income</option>
                <option value="500000">Below 5 Lakh</option>
                <option value="1000000">Below 10 Lakh</option>
                <option value="2000000">Below 20 Lakh</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select 
                className="form-input form-select"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="merit">Merit-based</option>
                <option value="need">Need-based</option>
                <option value="minority">Minority</option>
                <option value="women">Women</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className={styles.resultsInfo}>
        <span>{filteredScholarships.length} scholarships found</span>
      </div>

      <div className={styles.scholarshipsGrid}>
        {filteredScholarships.map((scholarship) => {
          const urgency = getDeadlineUrgency(scholarship.deadline);
          
          return (
            <div key={scholarship.id} className={styles.scholarshipCard}>
              <div className={styles.cardHeader}>
                <div className={styles.scholarshipInfo}>
                  <img 
                    src={scholarship.logo} 
                    alt={scholarship.organization}
                    className={styles.scholarshipLogo}
                  />
                  <div>
                    <h3>{scholarship.title}</h3>
                    <span className={styles.organization}>{scholarship.organization}</span>
                  </div>
                </div>
                <span className={`badge badge-${scholarship.category === 'merit' ? 'success' : 'info'}`}>
                  {scholarship.category}
                </span>
              </div>

              <div className={styles.cardBody}>
                <p className={styles.eligibility}>{scholarship.eligibility}</p>
                
                <div className={styles.scholarshipDetails}>
                  <div className={styles.detail}>
                    <DollarSign size={16} className={styles.detailIcon} />
                    <span>Up to NPR {scholarship.amount.toLocaleString()}</span>
                  </div>
                  
                  <div className={styles.detail}>
                    <Users size={16} className={styles.detailIcon} />
                    <span>{scholarship.recipients} recipients</span>
                  </div>
                  
                  <div className={styles.detail}>
                    <Calendar size={16} className={styles.detailIcon} />
                    <span className={`${styles.deadline} ${styles[urgency]}`}>
                      {formatDeadline(scholarship.deadline)}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <button className="btn btn-primary">
                  <ExternalLink size={16} />
                  Apply Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScholarshipList;