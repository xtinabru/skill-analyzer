import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

export default function SkillsChart() {
  const [selectedRole, setSelectedRole] = useState('frontend');
  const [isLoading, setIsLoading] = useState(false);
  const [loadedData, setLoadedData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    setLoadedData([]);

    fetch('/skills.json')
      .then((res) => res.json())
      .then((data) => {
        const skills = data[selectedRole];
        const sorted = [...skills].sort((a, b) => b.count - a.count);
        setLoadedData(sorted);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error:', err);
        setIsLoading(false);
      });
  }, [selectedRole]);

  return (
    <div style={{ width: '100%', height: 400 }}>
      <h2>Popular skills</h2>
      <label style={{ marginBottom: '1rem', display: 'block' }}>
        Choose the role:
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          style={{ marginLeft: '12rem', padding: '0.7rem' }}
        >
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="devops">DevOps</option>
        </select>
      </label>

      {isLoading ? (
        <p>Loading..</p>
      ) : (
        <ResponsiveContainer>
          <BarChart data={loadedData}>
            <XAxis dataKey="skill" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
