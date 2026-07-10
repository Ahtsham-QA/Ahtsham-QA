require('dotenv').config();
const axios = require('axios');

const auth = Buffer.from(`${process.env.JIRA_EMAIL}:${process.env.JIRA_API_TOKEN}`).toString('base64');

axios.post(
  `${process.env.JIRA_BASE_URL}/rest/api/3/issue`,
  {
    fields: {
      project: { key: process.env.JIRA_PROJECT_KEY },
      summary: 'Test bug from Playwright',
      description: {
        type: 'doc',
        version: 1,
        content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Test description' }] }]
      },
      issuetype: { name: 'Bug' },
      priority: { name: 'High' }
    }
  },
  {
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }
)
.then(r => console.log('✅ Success:', r.data.key))
.catch(e => console.error('❌ Error:', JSON.stringify(e.response?.data, null, 2)));
