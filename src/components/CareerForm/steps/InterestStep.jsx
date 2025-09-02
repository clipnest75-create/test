import { useState, useEffect } from 'react';
import styles from './InterestStep.module.css';

const InterestStep = ({ data, onChange }) => {
  const [selectedInterests, setSelectedInterests] = useState(data.interests || []);

  useEffect(() => {
    onChange({ interests: selectedInterests });
  }, [selectedInterests, onChange]);

  const riasecCategories = [
    {
      code: 'R',
      name: 'Realistic',
      description: 'Hands-on, practical work',
      icon: '🔧',
      examples: ['Engineering', 'Construction', 'Agriculture']
    },
    {
      code: 'I',
      name: 'Investigative',
      description: 'Research and analysis',
      icon: '🔬',
      examples: ['Science', 'Research', 'Medicine']
    },
    {
      code: 'A',
      name: 'Artistic',
      description: 'Creative expression',
      icon: '🎨',
      examples: ['Design', 'Writing', 'Music']
    },
    {
      code: 'S',
      name: 'Social',
      description: 'Helping and teaching others',
      icon: '👥',
      examples: ['Teaching', 'Counseling', 'Social Work']
    },
    {
      code: 'E',
      name: 'Enterprising',
      description: 'Leadership and business',
      icon: '💼',
      examples: ['Management', 'Sales', 'Politics']
    },
    {
      code: 'C',
      name: 'Conventional',
      description: 'Organization and detail work',
      icon: '📋',
      examples: ['Accounting', 'Administration', 'Banking']
    }
  ];

  const toggleInterest = (code) => {
    setSelectedInterests(prev => {
      if (prev.includes(code)) {
        return prev.filter(interest => interest !== code);
      } else {
        return [...prev, code];
      }
    });
  };

  return (
    <div className={styles.interestStep}>
      <div className={styles.intro}>
        <h3>What type of work interests you?</h3>
        <p>Select the categories that best describe your interests. You can choose multiple options.</p>
      </div>

      <div className={styles.categoriesGrid}>
        {riasecCategories.map((category) => (
          <div 
            key={category.code}
            className={`${styles.categoryCard} ${
              selectedInterests.includes(category.code) ? styles.selected : ''
            }`}
            onClick={() => toggleInterest(category.code)}
          >
            <div className={styles.categoryIcon}>{category.icon}</div>
            <h4>{category.name}</h4>
            <p className={styles.categoryDescription}>{category.description}</p>
            <div className={styles.examples}>
              {category.examples.map((example, index) => (
                <span key={index} className={styles.exampleTag}>
                  {example}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.selectionSummary}>
        <p>
          Selected: {selectedInterests.length} of {riasecCategories.length} categories
        </p>
      </div>
    </div>
  );
};

export default InterestStep;