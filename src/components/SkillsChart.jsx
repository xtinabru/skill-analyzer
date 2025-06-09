import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

export default function SkillsChart() {
  const [selectedRole, setSelectedRole] = useState('frontend');
  const [isLoading, setIsLoading] = useState(false);
  const [loadedData, setLoadedData] = useState([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setLoadedData([]);

    fetch('/skills.json')
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
        style={{ marginLeft: '14rem', padding: '0.7rem', marginBottom: '1rem' }}
      />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ResponsiveContainer>
          <BarChart
            data={loadedData.filter(skill =>
              skill.skill.toLowerCase().includes(filterText.toLowerCase())
            )}
          >
            <XAxis dataKey="skill" />
            <YAxis />
            <Tooltip
              formatter={(value, name, props) => {
                const percent = props.payload.percent;
                return [`${value} (${percent}%)`, "Mentions"];
              }}
            />
           <Bar dataKey="count" fill="#8884d8" barSize={70} />

          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
