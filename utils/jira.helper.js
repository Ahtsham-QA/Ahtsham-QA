const axios = require('axios');

const JIRA_BASE_URL = process.env.JIRA_BASE_URL;
const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
const JIRA_PROJECT_KEY = process.env.JIRA_PROJECT_KEY;

// Base64 encode credentials for Basic Auth
const auth = Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString('base64');

async function createJiraBug({ summary, description, priority = 'High' }) {
  try {
    const response = await axios.post(
      `${JIRA_BASE_URL}/rest/api/3/issue`,
      {
        fields: {
          project: { key: JIRA_PROJECT_KEY },
          summary: summary,
          description: {
            type: 'doc',
            version: 1,
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: description,
                  },
                ],
              },
            ],
          },
          issuetype: { name: 'Bug' },
          priority: { name: priority },
        },
      },
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    console.log(`✅ Jira bug created: ${JIRA_BASE_URL}/browse/${response.data.key}`);
    return response.data.key;

  } catch (error) {
  console.error(`❌ Failed to create Jira bug: ${error.message}`);
  console.error('Jira response:', JSON.stringify(error.response?.data, null, 2));
  throw error;
}

}

module.exports = { createJiraBug };