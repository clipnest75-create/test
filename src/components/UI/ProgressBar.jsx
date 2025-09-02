import styles from './ProgressBar.module.css';

const ProgressBar = ({ progress, showPercentage = true, size = 'medium' }) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <div className={`${styles.progressContainer} ${styles[size]}`}>
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
      {showPercentage && (
        <span className={styles.progressText}>
          {Math.round(clampedProgress)}%
        </span>
      )}
    </div>
  );
};

export default ProgressBar;