import { KNOWN_SKILLS } from './skillsList.js';

export function analyzeSkills(textArray) {
  const counter = {};

  for (const text of textArray) {
    for (const skill of KNOWN_SKILLS) {
      const regex = new RegExp(`\\b${skill}\\b`, 'gi'); 
      const matches = text.match(regex);

      if (matches) {
        counter[skill] = (counter[skill] || 0) + matches.length;
      }
    }
  }

  const result = Object.entries(counter).map(([skill, count]) => ({
    skill,
    count
  }));

  return result.sort((a, b) => b.count - a.count);
}
