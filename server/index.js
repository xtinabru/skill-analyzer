import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());

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

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
