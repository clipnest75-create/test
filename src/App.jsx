import { useState } from 'react';
import './styles/global.css';
import Header from './components/Layout/Header';
import CareerForm from './components/CareerForm/CareerForm';
import CareerResults from './components/CareerResults/CareerResults';
import PathwayFinder from './components/PathwayFinder/PathwayFinder';
import ScholarshipList from './components/ScholarshipList/ScholarshipList';
import SoftSkillRadar from './components/SoftSkillRadar/SoftSkillRadar';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const [currentView, setCurrentView] = useState('form');
  const [userData, setUserData] = useState(null);

  // Mock data for demonstration
  const mockCareers = [
    {
      id: 1,
      title: 'Software Engineer',
      description: 'Design and develop software applications, websites, and systems using various programming languages and technologies.',
      salaryMin: 800000,
      salaryMax: 2500000,
      outlook: 'high',
      confidence: 85,
      industryTrend: 'The tech industry in Nepal is rapidly growing with increasing demand for skilled developers. Remote work opportunities are expanding globally.'
    },
    {
      id: 2,
      title: 'Data Scientist',
      description: 'Analyze complex data to help organizations make informed business decisions using statistical methods and machine learning.',
      salaryMin: 1000000,
      salaryMax: 3000000,
      outlook: 'high',
      confidence: 78,
      industryTrend: 'Data science is emerging as a critical field in Nepal with banks, telecom, and e-commerce companies investing heavily in analytics.'
    },
    {
      id: 3,
      title: 'Civil Engineer',
      description: 'Plan, design, and oversee construction of infrastructure projects including roads, bridges, and buildings.',
      salaryMin: 600000,
      salaryMax: 1800000,
      outlook: 'medium',
      confidence: 72,
      industryTrend: 'Infrastructure development remains strong in Nepal with government focus on connectivity and urban development projects.'
    }
  ];

  const mockPathways = [
    {
      id: 1,
      type: 'local',
      program: 'Bachelor in Computer Engineering',
      university: 'Tribhuvan University',
      affiliation: 'TU',
      cost: 400000,
      duration: '4 years',
      location: 'Kathmandu',
      requirements: 'SEE with 60% or above',
      highlights: ['Strong theoretical foundation', 'Industry partnerships', 'Research opportunities']
    },
    {
      id: 2,
      type: 'affiliated',
      program: 'BIT (Bachelor in Information Technology)',
      university: 'Deakin University (via ISMT)',
      affiliation: 'Foreign',
      cost: 1200000,
      duration: '3 years',
      location: 'Kathmandu',
      requirements: '+2 with 60% or above',
      highlights: ['International degree', 'Modern curriculum', 'Industry exposure']
    },
    {
      id: 3,
      type: 'abroad',
      program: 'Computer Science',
      university: 'University of Melbourne',
      affiliation: 'Foreign',
      cost: 8000000,
      duration: '3 years',
      location: 'Melbourne, Australia',
      requirements: 'IELTS 6.5, Strong academics',
      highlights: ['World-class education', 'Work opportunities', 'Immigration pathway']
    }
  ];

  const mockScholarships = [
    {
      id: 1,
      title: 'Merit Scholarship for Engineering',
      organization: 'Nepal Engineering Council',
      logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      category: 'merit',
      amount: 200000,
      recipients: 50,
      deadline: '2025-03-15',
      eligibility: 'Students with 80%+ in +2 Science pursuing engineering degrees',
      eligibleGrades: ['bachelor'],
      incomeLimit: 1000000
    },
    {
      id: 2,
      title: 'Women in STEM Scholarship',
      organization: 'Tech Sisters Nepal',
      logo: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      category: 'women',
      amount: 150000,
      recipients: 25,
      deadline: '2025-02-28',
      eligibility: 'Female students pursuing STEM fields with financial need',
      eligibleGrades: ['bachelor', 'master'],
      incomeLimit: 800000
    }
  ];

  const mockSkillsData = {
    Communication: 3,
    Teamwork: 4,
    'Problem Solving': 4,
    Leadership: 2,
    'Time Management': 3,
    Adaptability: 3
  };

  const mockCourses = [
    {
      id: 1,
      title: 'Effective Communication Skills',
      provider: 'CTEVT',
      logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop',
      description: 'Improve your verbal and written communication abilities',
      duration: '6 weeks'
    },
    {
      id: 2,
      title: 'Leadership Fundamentals',
      provider: 'Coursera',
      logo: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop',
      description: 'Develop essential leadership and management skills',
      duration: '8 weeks'
    }
  ];

  const mockUserData = {
    name: 'Priya Sharma',
    level: 'Grade 12 Student',
    careersExplored: 5,
    scholarshipsApplied: 2,
    skillsImproved: 3,
    goalsCompleted: 4
  };

  const handleFormSubmit = (formData) => {
    setUserData(formData);
    setCurrentView('results');
  };

  const handleSaveCareer = (career) => {
    console.log('Saving career:', career);
    // Implementation for saving career
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'form':
        return <CareerForm onSubmit={handleFormSubmit} />;
      case 'results':
        return <CareerResults careers={mockCareers} onSaveCareer={handleSaveCareer} />;
      case 'pathways':
        return <PathwayFinder pathways={mockPathways} />;
      case 'scholarships':
        return <ScholarshipList scholarships={mockScholarships} />;
      case 'skills':
        return <SoftSkillRadar skillsData={mockSkillsData} recommendedCourses={mockCourses} />;
      case 'dashboard':
        return <Dashboard userData={mockUserData} />;
      default:
        return <CareerForm onSubmit={handleFormSubmit} />;
    }
  };

  return (
    <div className="app">
      <Header />
      <main>
        {renderCurrentView()}
      </main>
      
      {/* Demo Navigation */}
      <div style={{ 
        position: 'fixed', 
        bottom: '20px', 
        right: '20px', 
        background: 'white', 
        padding: '16px', 
        borderRadius: '12px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        border: '1px solid var(--color-neutral-200)',
        zIndex: 1000
      }}>
        <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: '600', color: 'var(--color-neutral-600)' }}>
          Demo Navigation
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <button onClick={() => setCurrentView('form')} style={{ fontSize: '11px', padding: '4px 8px' }}>Form</button>
          <button onClick={() => setCurrentView('results')} style={{ fontSize: '11px', padding: '4px 8px' }}>Results</button>
          <button onClick={() => setCurrentView('pathways')} style={{ fontSize: '11px', padding: '4px 8px' }}>Pathways</button>
          <button onClick={() => setCurrentView('scholarships')} style={{ fontSize: '11px', padding: '4px 8px' }}>Scholarships</button>
          <button onClick={() => setCurrentView('skills')} style={{ fontSize: '11px', padding: '4px 8px' }}>Skills</button>
          <button onClick={() => setCurrentView('dashboard')} style={{ fontSize: '11px', padding: '4px 8px' }}>Dashboard</button>
        </div>
      </div>
    </div>
  );
}

export default App;
