import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {skillsByRole } from '../data/skills';
import { useState } from 'react';

export default function SkillsChart() {

  const [selectedRole, setSelectedRole] = useState('frontend');
  const [isLoading, setIsLoading] = useState(false);
  const [loadedData, setLoadedData] = useState([]);

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
<button
  onClick={() => {
    setIsLoading(true);
    setTimeout(() => {
      setLoadedData(skillsByRole[selectedRole]);
      setIsLoading(false);
    }, 1000);
  }}
  style={{
    padding: '0.5rem 1rem',
    marginBottom: '1rem',
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }}
>
  Upload data
</button>
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
// This component renders a bar chart using Recharts to visualize the skills data.