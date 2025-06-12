import axios from 'axios';


export async function fetchJobDescriptions() {
  try {
    const { data: html } = await axios.get('https://jobicy.com/remote-jobs');

    return html;
  } catch (error) {
    console.error('❌ Error fetching jobs:', error.message);
    return '';
  }
}
