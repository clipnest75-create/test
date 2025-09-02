import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import styles from './SoftSkillRadar.module.css';

const SoftSkillRadar = ({ skillsData, recommendedCourses }) => {
  const radarData = [
    { skill: 'Communication', value: skillsData.Communication || 0, fullMark: 5 },
    { skill: 'Teamwork', value: skillsData.Teamwork || 0, fullMark: 5 },
    { skill: 'Problem Solving', value: skillsData['Problem Solving'] || 0, fullMark: 5 },
    { skill: 'Leadership', value: skillsData.Leadership || 0, fullMark: 5 },
    { skill: 'Time Management', value: skillsData['Time Management'] || 0, fullMark: 5 },
    { skill: 'Adaptability', value: skillsData.Adaptability || 0, fullMark: 5 }
  ];

  const getSkillLevel = (value) => {
    if (value >= 4) return 'Strong';
    if (value >= 3) return 'Good';
    if (value >= 2) return 'Fair';
    return 'Developing';
  };

  const getImprovementAreas = () => {
    return radarData
      .filter(item => item.value < 3)
      .sort((a, b) => a.value - b.value)
      .slice(0, 3);
  };

  const improvementAreas = getImprovementAreas();

  return (
    <div className={styles.radarContainer}>
      <div className={styles.header}>
        <h2>Your Soft Skills Profile</h2>
        <p>Visual representation of your current soft skills assessment.</p>
      </div>

      <div className={styles.content}>
        <div className={styles.chartSection}>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="var(--color-neutral-300)" />
                <PolarAngleAxis 
                  dataKey="skill" 
                  tick={{ 
                    fontSize: 12, 
                    fill: 'var(--color-neutral-600)',
                    fontFamily: 'var(--font-heading)'
                  }}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 5]} 
                  tick={{ fontSize: 10, fill: 'var(--color-neutral-500)' }}
                />
                <Radar
                  name="Skills"
                  dataKey="value"
                  stroke="var(--color-primary)"
                  fill="var(--color-primary)"
                  fillOpacity={0.1}
                  strokeWidth={3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.skillsLegend}>
            {radarData.map((item) => (
              <div key={item.skill} className={styles.legendItem}>
                <span className={styles.skillName}>{item.skill}</span>
                <div className={styles.skillRating}>
                  <span className={styles.skillValue}>{item.value}/5</span>
                  <span className={`${styles.skillLevel} ${styles[getSkillLevel(item.value).toLowerCase()]}`}>
                    {getSkillLevel(item.value)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.recommendationsSection}>
          {improvementAreas.length > 0 && (
            <div className={styles.improvementAreas}>
              <h3>Areas for Development</h3>
              <div className={styles.improvementList}>
                {improvementAreas.map((area) => (
                  <div key={area.skill} className={styles.improvementItem}>
                    <span className={styles.improvementSkill}>{area.skill}</span>
                    <span className={styles.improvementScore}>
                      Current: {area.value}/5
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={styles.coursesSection}>
            <h3>Recommended Courses</h3>
            <div className={styles.coursesGrid}>
              {recommendedCourses.map((course) => (
                <div key={course.id} className={styles.courseCard}>
                  <div className={styles.courseHeader}>
                    <img 
                      src={course.logo} 
                      alt={course.provider}
                      className={styles.courseLogo}
                    />
                    <div>
                      <h4>{course.title}</h4>
                      <span className={styles.courseProvider}>{course.provider}</span>
                    </div>
                  </div>
                  <p className={styles.courseDescription}>{course.description}</p>
                  <div className={styles.courseFooter}>
                    <span className={styles.courseDuration}>{course.duration}</span>
                    <button className="btn btn-outline">
                      Enroll
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoftSkillRadar;