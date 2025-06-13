import axios from 'axios';
import * as cheerio from 'cheerio';
import { analyzeSkills } from './analyzeSkills.js';


export async function fetchJobDescriptions() {
  try {
    const { data: html } = await axios.get('https://jobicy.com/jobs');
    const $ = cheerio.load(html);

    // links 
    const links = [];
    $('.job-list li a').each((_, el) => {
      const href = $(el).attr('href');
      if (href && href.startsWith('https://jobicy.com')) {
        links.push(href);
      }
    });

    // description
    const descriptions = [];

    for (const link of links.slice(0, 10)) { 
      const { data: jobHtml } = await axios.get(link);
      const $$ = cheerio.load(jobHtml);
 
      const text = $$('.job-description, article').text();
      if (text) descriptions.push(text);
    }

    const stats = analyzeSkills(descriptions);
    return stats;

  } catch (error) {
    console.error('Error:', error.message);
    return [];
  }
}
