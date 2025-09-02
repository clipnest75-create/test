import { useState, useEffect } from 'react';
import styles from './AcademicStep.module.css';

const AcademicStep = ({ data, onChange }) => {
  const [formData, setFormData] = useState({
    level: '',
    gpa: '',
    mathsMarks: '',
    scienceMarks: '',
    englishMarks: '',
    entranceScore: '',
    ...data
  });

  useEffect(() => {
    onChange(formData);
  }, [formData, onChange]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const subjects = [
    { key: 'mathsMarks', label: 'Mathematics', icon: '📊' },
    { key: 'scienceMarks', label: 'Science', icon: '🔬' },
    { key: 'englishMarks', label: 'English', icon: '📝' }
  ];

  return (
    <div className={styles.academicStep}>
      <div className={styles.intro}>
        <h3>Tell us about your academic background</h3>
        <p>This information helps us understand your strengths and suggest suitable career paths.</p>
      </div>

      <div className={styles.formGrid}>
        <div className="form-group">
          <label className="form-label">Education Level</label>
          <select 
            className="form-input form-select"
            value={formData.level}
            onChange={(e) => handleChange('level', e.target.value)}
          >
            <option value="">Select your level</option>
            <option value="grade-10">Grade 10 (SEE)</option>
            <option value="grade-12">Grade 12 (+2)</option>
            <option value="bachelor">Bachelor's Degree</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Overall GPA/Percentage</label>
          <input 
            type="number"
            className="form-input"
            placeholder="e.g., 3.5 or 85%"
            value={formData.gpa}
            onChange={(e) => handleChange('gpa', e.target.value)}
          />
        </div>

        <div className={styles.subjectsGrid}>
          {subjects.map((subject) => (
            <div key={subject.key} className={styles.subjectCard}>
              <div className={styles.subjectHeader}>
                <span className={styles.subjectIcon}>{subject.icon}</span>
                <label className="form-label">{subject.label}</label>
              </div>
              <input 
                type="number"
                className="form-input"
                placeholder="Marks/Grade"
                value={formData[subject.key]}
                onChange={(e) => handleChange(subject.key, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="form-group">
          <label className="form-label">Entrance Exam Score (if applicable)</label>
          <input 
            type="number"
            className="form-input"
            placeholder="e.g., SAT, IOE, MBBS entrance score"
            value={formData.entranceScore}
            onChange={(e) => handleChange('entranceScore', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default AcademicStep;