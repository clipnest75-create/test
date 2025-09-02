import { useState } from 'react';
import { ChevronRight, ChevronLeft, GraduationCap, Brain, Target } from 'lucide-react';
import styles from './CareerForm.module.css';
import ProgressBar from '../UI/ProgressBar';
import AcademicStep from './steps/AcademicStep';
import InterestStep from './steps/InterestStep';
import SkillsStep from './steps/SkillsStep';

const CareerForm = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    academic: {},
    interests: {},
    skills: {}
  });

  const steps = [
    {
      id: 'academic',
      title: 'Academic Information',
      icon: GraduationCap,
      component: AcademicStep
    },
    {
      id: 'interests',
      title: 'Interest Assessment',
      icon: Brain,
      component: InterestStep
    },
    {
      id: 'skills',
      title: 'Skills Evaluation',
      icon: Target,
      component: SkillsStep
    }
  ];

  const updateFormData = (stepData) => {
    const stepId = steps[currentStep].id;
    setFormData(prev => ({
      ...prev,
      [stepId]: stepData
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit(formData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const CurrentStepComponent = steps[currentStep].component;
  const StepIcon = steps[currentStep].icon;

  return (
    <div className={styles.formContainer}>
      <div className={styles.formCard}>
        <div className={styles.header}>
          <div className={styles.stepInfo}>
            <div className={styles.stepIcon}>
              <StepIcon size={24} />
            </div>
            <div>
              <h2>{steps[currentStep].title}</h2>
              <p>Step {currentStep + 1} of {steps.length}</p>
            </div>
          </div>
          <ProgressBar progress={progress} />
        </div>

        <div className={styles.stepContent}>
          <CurrentStepComponent 
            data={formData[steps[currentStep].id]}
            onChange={updateFormData}
          />
        </div>

        <div className={styles.navigation}>
          <button 
            type="button"
            className="btn btn-secondary"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ChevronLeft size={16} />
            Previous
          </button>
          
          <button 
            type="button"
            className="btn btn-primary"
            onClick={handleNext}
          >
            {currentStep === steps.length - 1 ? 'Get Career Suggestions' : 'Next'}
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareerForm;