import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

export default function SkillsChart() {
  const [selectedRole, setSelectedRole] = useState('frontend');
  const [isLoading, setIsLoading] = useState(false);
  const [loadedData, setLoadedData] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [showPercent, setShowPercent] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setLoadedData([]);

    fetch('http://localhost:3000/api/skills')
      .then((res) => res.json())
      .then((data) => {
        const skills = data[selectedRole];
        const total = skills.reduce((sum, skill) => sum + skill.count, 0);

        const withPercent = skills.map((skill) => ({
          ...skill,
          percent: ((skill.count / total) * 100).toFixed(1)
        }));

        const sorted = [...withPercent].sort((a, b) => b.count - a.count);
        setLoadedData(sorted);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error:', err);
        setIsLoading(false);
      });
  }, [selectedRole]);

  const totalMentions = loadedData.reduce((sum, skill) => sum + skill.count, 0);

  const topSkills = loadedData
    .filter(skill => skill.skill.toLowerCase().includes(filterText.toLowerCase()))
    .slice(0, 3);

  return (
    <div style={{ width: '100%', height: 400 }}>
      <h2>Popular skills</h2>
      <p>Total mentions: {totalMentions}</p>

      <label style={{ marginBottom: '1rem', display: 'block' }}>
        Choose the role:
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          style={{ marginLeft: '14rem', padding: '0.7rem' }}
        >
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="devops">DevOps</option>
        </select>
      </label>

      <input
        type="text"
        placeholder="Search skill..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        style={{
          color: 'white',
          border: 'none',
          padding: '0.75rem 1rem',
          borderRadius: '4px',
          marginBottom: '1rem',
          marginTop: '2rem'
        }}
      />

      <button
        onClick={() => setShowPercent(!showPercent)}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#4f46e5',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          marginBottom: '1rem',
          marginLeft: '1rem',
          cursor: 'pointer'
        }}
      >
        Show {showPercent ? 'counts' : 'percentages'}
      </button>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ResponsiveContainer>
            <BarChart
              data={loadedData.filter(skill =>
                skill.skill.toLowerCase().includes(filterText.toLowerCase())
              )}
            >
              <XAxis dataKey="skill" />
              <YAxis />
              <Tooltip
                formatter={(value, name, { payload }) => {
                  if (!payload) return value;

                  if (showPercent) {
                    return [`${value}%`, 'Percent'];
                  } else {
                    return [value, 'Mentions'];
                  }
                }}
              />
              <Bar
                dataKey={showPercent ? 'percent' : 'count'}
                fill="#8884d8"
                barSize={70}
              />
            </BarChart>
          </ResponsiveContainer>

          <div style={{ marginTop: '1rem' }}>
            <h3>Top {topSkills.length} skills:</h3>
            <ol>
              {topSkills.map((skill, index) => (
                <li key={index}>
                  {skill.skill} — {showPercent ? `${skill.percent}%` : `${skill.count} mentions`}
                </li>
              ))}
            </ol>
          </div>
        </>
      )}
    </div>
  );
}
