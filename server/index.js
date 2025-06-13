import express from 'express';
import cors from 'cors';
import { fetchJobDescriptions } from './fetchJobs.js'; 

const app = express();
const PORT = 3000;

app.use(cors());


fetchJobDescriptions().then((descriptions) => {
  console.log('Descriptions:', descriptions.length);
  descriptions.forEach((desc, i) => {
    console.log(`\n--- Job ${i + 1} ---\n`);
    console.log(desc.slice(0, 300)); 
  });
});


const skillsByRole = {
  frontend: [
    { skill: 'React', count: 42 },
    { skill: 'CSS', count: 30 },
    { skill: 'JavaScript', count: 25 }
  ],
  backend: [
    { skill: 'Node.js', count: 28 },
    { skill: 'PostgreSQL', count: 20 },
    { skill: 'Java', count: 18 }
  ],
  devops: [
    { skill: 'Docker', count: 22 },
    { skill: 'AWS', count: 16 },
    { skill: 'Terraform', count: 12 }
  ]
};

app.get('/api/skills', (req, res) => {
  res.json(skillsByRole);
});

app.get('/api/jobs', async (req, res) => {
  try {
    const result = await fetchJobDescriptions();
    res.json(result);
  } catch (err) {
    console.error('Error in /api/jobs:', err);
    res.status(500).json({ error: 'Failed to load job data' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
