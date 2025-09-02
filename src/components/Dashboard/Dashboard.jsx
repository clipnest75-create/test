import { useState } from 'react';
import { BookOpen, Award, Target, TrendingUp, Calendar, Star } from 'lucide-react';
import styles from './Dashboard.module.css';
import ProgressBar from '../UI/ProgressBar';

const Dashboard = ({ userData }) => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'careers', label: 'Saved Careers', icon: BookOpen },
    { id: 'scholarships', label: 'Scholarships', icon: Award },
    { id: 'progress', label: 'Progress', icon: Target }
  ];

  const quickStats = [
    { label: 'Careers Explored', value: userData.careersExplored || 0, icon: BookOpen },
    { label: 'Scholarships Applied', value: userData.scholarshipsApplied || 0, icon: Award },
    { label: 'Skills Improved', value: userData.skillsImproved || 0, icon: Star },
    { label: 'Goals Completed', value: userData.goalsCompleted || 0, icon: Target }
  ];

  const recentActivity = [
    { type: 'career', title: 'Explored Software Engineering path', time: '2 hours ago' },
    { type: 'scholarship', title: 'Applied for Merit Scholarship', time: '1 day ago' },
    { type: 'skill', title: 'Completed Communication course', time: '3 days ago' },
    { type: 'goal', title: 'Updated career preferences', time: '1 week ago' }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'career': return <BookOpen size={16} />;
      case 'scholarship': return <Award size={16} />;
      case 'skill': return <Star size={16} />;
      case 'goal': return <Target size={16} />;
      default: return <Calendar size={16} />;
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <div className={styles.userProfile}>
          <div className={styles.avatar}>
            {userData.name?.charAt(0) || 'U'}
          </div>
          <div className={styles.userInfo}>
            <h3>{userData.name || 'User'}</h3>
            <p>{userData.level || 'Student'}</p>
          </div>
        </div>

        <nav className={styles.navigation}>
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                className={`${styles.navItem} ${activeSection === section.id ? styles.active : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <Icon size={20} />
                {section.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className={styles.mainContent}>
        {activeSection === 'overview' && (
          <div className={styles.overview}>
            <div className={styles.welcomeSection}>
              <h2>Welcome back, {userData.name || 'Student'}!</h2>
              <p>Here's your career journey progress and recent activities.</p>
            </div>

            <div className={styles.statsGrid}>
              {quickStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className={styles.statCard}>
                    <div className={styles.statIcon}>
                      <Icon size={24} />
                    </div>
                    <div className={styles.statInfo}>
                      <span className={styles.statValue}>{stat.value}</span>
                      <span className={styles.statLabel}>{stat.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={styles.contentGrid}>
              <div className={styles.progressSection}>
                <h3>Career Journey Progress</h3>
                <div className={styles.progressItems}>
                  <div className={styles.progressItem}>
                    <span>Profile Completion</span>
                    <ProgressBar progress={85} />
                  </div>
                  <div className={styles.progressItem}>
                    <span>Career Exploration</span>
                    <ProgressBar progress={60} />
                  </div>
                  <div className={styles.progressItem}>
                    <span>Skill Development</span>
                    <ProgressBar progress={40} />
                  </div>
                </div>
              </div>

              <div className={styles.activitySection}>
                <h3>Recent Activity</h3>
                <div className={styles.activityList}>
                  {recentActivity.map((activity, index) => (
                    <div key={index} className={styles.activityItem}>
                      <div className={styles.activityIcon}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className={styles.activityInfo}>
                        <span className={styles.activityTitle}>{activity.title}</span>
                        <span className={styles.activityTime}>{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'careers' && (
          <div className={styles.section}>
            <h2>Saved Careers</h2>
            <p>Your bookmarked career paths and exploration history.</p>
            <div className={styles.emptyState}>
              <BookOpen size={48} />
              <h3>No saved careers yet</h3>
              <p>Start exploring careers to save your favorites here.</p>
              <button className="btn btn-primary">Explore Careers</button>
            </div>
          </div>
        )}

        {activeSection === 'scholarships' && (
          <div className={styles.section}>
            <h2>Scholarship Applications</h2>
            <p>Track your scholarship applications and deadlines.</p>
            <div className={styles.emptyState}>
              <Award size={48} />
              <h3>No scholarship applications yet</h3>
              <p>Browse available scholarships and start applying.</p>
              <button className="btn btn-primary">Browse Scholarships</button>
            </div>
          </div>
        )}

        {activeSection === 'progress' && (
          <div className={styles.section}>
            <h2>Learning Progress</h2>
            <p>Your skill development and improvement plans.</p>
            <div className={styles.emptyState}>
              <Target size={48} />
              <h3>No progress tracking yet</h3>
              <p>Complete assessments to start tracking your progress.</p>
              <button className="btn btn-primary">Take Assessment</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;