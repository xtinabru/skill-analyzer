import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { fakeSkills } from '../data/skills';

export default function SkillsChart() {
  return (
    <div style={{ width: '100%', height: 400 }}>
      <h2>Popular skills</h2>
      <ResponsiveContainer>
        <BarChart data={fakeSkills}>
          <XAxis dataKey="skill" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
// This component renders a bar chart using Recharts to visualize the skills data.