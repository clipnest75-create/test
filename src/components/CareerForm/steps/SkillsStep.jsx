import { useState, useEffect } from 'react';
import styles from './SkillsStep.module.css';

const SkillsStep = ({ data, onChange }) => {
  const [skills, setSkills] = useState(data.skills || {});

  useEffect(() => {
    onChange({ skills });
  }, [skills, onChange]);

  const skillCategories = [
    {
      name: 'Communication',
      icon: '💬',
      description: 'Verbal and written communication abilities'
    },
    {
      name: 'Teamwork',
      icon: '🤝',
      description: 'Collaboration and interpersonal skills'
    },
    {
      name: 'Problem Solving',
      icon: '🧩',
      description: 'Analytical thinking and solution finding'
    },
    {
      name: 'Leadership',
      icon: '👑',
      description: 'Ability to guide and motivate others'
    },
    {
      name: 'Time Management',
      icon: '⏰',
      description: 'Organization and prioritization skills'
    },
    {
      name: 'Adaptability',
      icon: '🔄',
      description: 'Flexibility and learning agility'
    }
  ];

  const handleSkillChange = (skillName, value) => {
    setSkills(prev => ({
      ...prev,
      [skillName]: parseInt(value)
    }));
  };

  const getSkillLevel = (value) => {
    if (value >= 4) return { label: 'Strong', color: 'success' };
    if (value >= 3) return { label: 'Good', color: 'info' };
    if (value >= 2) return { label: 'Fair', color: 'warning' };
    return { label: 'Developing', color: 'neutral' };
  };

  return (
    <div className={styles.skillsStep}>
      <div className={styles.intro}>
        <h3>Rate your soft skills</h3>
        <p>Honestly assess your current abilities. This helps us recommend development areas.</p>
      </div>

      <div className={styles.skillsGrid}>
        {skillCategories.map((skill) => {
          const currentValue = skills[skill.name] || 1;
          const skillLevel = getSkillLevel(currentValue);
          
          return (
            <div key={skill.name} className={styles.skillCard}>
              <div className={styles.skillHeader}>
                <div className={styles.skillIcon}>{skill.icon}</div>
                <div>
                  <h4>{skill.name}</h4>
                  <p>{skill.description}</p>
                </div>
              </div>
              
              <div className={styles.skillRating}>
                <div className={styles.ratingScale}>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      className={`${styles.ratingButton} ${
                        currentValue >= value ? styles.active : ''
                      }`}
                      onClick={() => handleSkillChange(skill.name, value)}
                    >
                      {value}
                    </button>
                  ))}
                </div>
                <div className={`${styles.skillLevel} ${styles[skillLevel.color]}`}>
                  {skillLevel.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.ratingGuide}>
        <h4>Rating Guide:</h4>
        <div className={styles.guideItems}>
          <span>1 = Beginner</span>
          <span>2 = Developing</span>
          <span>3 = Good</span>
          <span>4 = Strong</span>
          <span>5 = Expert</span>
        </div>
      </div>
    </div>
  );
};

export default SkillsStep;