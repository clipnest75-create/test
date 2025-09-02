import styles from './ConfidenceMeter.module.css';

const ConfidenceMeter = ({ value, size = 'medium', showLabel = true }) => {
  const clampedValue = Math.min(Math.max(value, 0), 100);
  
  const getConfidenceLevel = (val) => {
    if (val >= 80) return { label: 'High', color: 'high' };
    if (val >= 60) return { label: 'Medium', color: 'medium' };
    return { label: 'Low', color: 'low' };
  };

  const confidence = getConfidenceLevel(clampedValue);
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (clampedValue / 100) * circumference;

  return (
    <div className={`${styles.confidenceMeter} ${styles[size]}`}>
      <div className={styles.meterContainer}>
        <svg className={styles.meterSvg} viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="var(--color-neutral-200)"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={`var(--color-confidence-${confidence.color})`}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 50 50)"
            className={styles.progressCircle}
          />
        </svg>
        <div className={styles.meterValue}>
          <span className={styles.percentage}>{Math.round(clampedValue)}%</span>
          {showLabel && (
            <span className={`${styles.label} ${styles[confidence.color]}`}>
              {confidence.label}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfidenceMeter;