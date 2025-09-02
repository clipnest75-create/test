import { TrendingUp, DollarSign, Users, BookOpen } from 'lucide-react';
import styles from './CareerResults.module.css';
import ConfidenceMeter from '../UI/ConfidenceMeter';

const CareerResults = ({ careers, onSaveCareer }) => {
  const formatSalary = (min, max) => {
    return `NPR ${min.toLocaleString()} - ${max.toLocaleString()}`;
  };

  const getOutlookIcon = (outlook) => {
    switch (outlook) {
      case 'high': return <TrendingUp className={styles.outlookHigh} />;
      case 'medium': return <TrendingUp className={styles.outlookMedium} />;
      case 'low': return <TrendingUp className={styles.outlookLow} />;
      default: return <TrendingUp className={styles.outlookMedium} />;
    }
  };

  return (
    <div className={styles.resultsContainer}>
      <div className={styles.header}>
        <h2>Your Career Matches</h2>
        <p>Based on your academic background, interests, and skills, here are your top career recommendations.</p>
      </div>

      <div className={styles.careersGrid}>
        {careers.map((career, index) => (
          <div key={career.id} className={styles.careerCard}>
            <div className={styles.cardHeader}>
              <div className={styles.careerRank}>#{index + 1}</div>
              <button 
                className={styles.saveButton}
                onClick={() => onSaveCareer(career)}
                title="Save to Dashboard"
              >
                <BookOpen size={16} />
              </button>
            </div>

            <div className={styles.careerInfo}>
              <h3>{career.title}</h3>
              <p className={styles.description}>{career.description}</p>
            </div>

            <div className={styles.metrics}>
              <div className={styles.metric}>
                <DollarSign size={16} className={styles.metricIcon} />
                <div>
                  <span className={styles.metricLabel}>Salary Range</span>
                  <span className={styles.metricValue}>
                    {formatSalary(career.salaryMin, career.salaryMax)}
                  </span>
                </div>
              </div>

              <div className={styles.metric}>
                <Users size={16} className={styles.metricIcon} />
                <div>
                  <span className={styles.metricLabel}>Job Market</span>
                  <span className={styles.metricValue}>
                    {getOutlookIcon(career.outlook)}
                    {career.outlook} demand
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.industryTrend}>
              <h4>Industry Insight</h4>
              <p>{career.industryTrend}</p>
            </div>

            <div className={styles.confidence}>
              <span className={styles.confidenceLabel}>Match Confidence</span>
              <ConfidenceMeter 
                value={career.confidence} 
                size="large"
              />
            </div>

            <div className={styles.cardActions}>
              <button className="btn btn-primary">
                Explore Path
              </button>
              <button className="btn btn-outline">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerResults;