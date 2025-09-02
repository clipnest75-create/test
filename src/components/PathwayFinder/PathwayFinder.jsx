import { useState } from 'react';
import { MapPin, DollarSign, Clock, Award } from 'lucide-react';
import styles from './PathwayFinder.module.css';

const PathwayFinder = ({ pathways }) => {
  const [activeTab, setActiveTab] = useState('local');

  const tabs = [
    { id: 'local', label: 'Local Universities', icon: '🏛️' },
    { id: 'affiliated', label: 'Foreign Affiliated (Nepal)', icon: '🌐' },
    { id: 'abroad', label: 'Study Abroad', icon: '✈️' }
  ];

  const filteredPathways = pathways.filter(pathway => pathway.type === activeTab);

  const formatCost = (cost) => {
    if (cost >= 1000000) {
      return `NPR ${(cost / 1000000).toFixed(1)}M`;
    }
    return `NPR ${cost.toLocaleString()}`;
  };

  const getAffiliationBadge = (affiliation) => {
    const badges = {
      'TU': { label: 'TU Affiliated', color: 'info' },
      'KU': { label: 'KU Affiliated', color: 'success' },
      'PU': { label: 'PU Affiliated', color: 'warning' },
      'Foreign': { label: 'International', color: 'primary' }
    };
    
    return badges[affiliation] || { label: affiliation, color: 'neutral' };
  };

  return (
    <div className={styles.pathwayContainer}>
      <div className={styles.header}>
        <h2>Education Pathways</h2>
        <p>Explore different educational routes to achieve your career goals.</p>
      </div>

      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className={styles.tabIcon}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.pathwaysGrid}>
        {filteredPathways.map((pathway) => {
          const badge = getAffiliationBadge(pathway.affiliation);
          
          return (
            <div key={pathway.id} className={styles.pathwayCard}>
              <div className={styles.cardHeader}>
                <div className={styles.programInfo}>
                  <h3>{pathway.program}</h3>
                  <span className={`badge badge-${badge.color}`}>
                    {badge.label}
                  </span>
                </div>
                <div className={styles.university}>
                  {pathway.university}
                </div>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.pathwayDetails}>
                  <div className={styles.detail}>
                    <DollarSign size={16} className={styles.detailIcon} />
                    <div>
                      <span className={styles.detailLabel}>Total Cost</span>
                      <span className={styles.detailValue}>
                        {formatCost(pathway.cost)}
                      </span>
                    </div>
                  </div>

                  <div className={styles.detail}>
                    <Clock size={16} className={styles.detailIcon} />
                    <div>
                      <span className={styles.detailLabel}>Duration</span>
                      <span className={styles.detailValue}>
                        {pathway.duration}
                      </span>
                    </div>
                  </div>

                  <div className={styles.detail}>
                    <MapPin size={16} className={styles.detailIcon} />
                    <div>
                      <span className={styles.detailLabel}>Location</span>
                      <span className={styles.detailValue}>
                        {pathway.location}
                      </span>
                    </div>
                  </div>

                  <div className={styles.detail}>
                    <Award size={16} className={styles.detailIcon} />
                    <div>
                      <span className={styles.detailLabel}>Entry Requirements</span>
                      <span className={styles.detailValue}>
                        {pathway.requirements}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={styles.highlights}>
                  <h4>Program Highlights</h4>
                  <ul>
                    {pathway.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <button className="btn btn-primary">
                  Learn More
                </button>
                <button className="btn btn-outline">
                  Compare
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PathwayFinder;