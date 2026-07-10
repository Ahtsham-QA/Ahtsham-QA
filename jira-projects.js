require('dotenv').config();
const axios = require('axios');

const auth = Buffer.from(`${process.env.JIRA_EMAIL}:${process.env.JIRA_API_TOKEN}`).toString('base64');

axios.get(
  `${process.env.JIRA_BASE_URL}/rest/api/3/project`,
  {
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }
)
.then(r => {
  console.log('✅ Your Jira projects:');
  r.data.forEach(p => console.log(`  Key: ${p.key} | Name: ${p.name}`));
})
.catch(e => console.error('❌ Error:', JSON.stringify(e.response?.data, null, 2)));
