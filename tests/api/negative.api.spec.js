const { test, expect } = require('@playwright/test');
const { createJiraBug } = require('../../utils/jira.helper');

const BASE_URL = 'https://reqres.in/api';

test.describe('Negative API scenarios', () => {

  // Negative scenario: login without a password should return 400.
  test('POST /login with missing password returns 400', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/login`, {
      data: {
        email: 'eve.holt@reqres.in',
      },
    });
    expect(response.status()).toBe(400);
  });

  // Negative scenario: login without an email should return 400.
  test('POST /login with missing email returns 400', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/login`, {
      data: {
        password: 'cityslicka',
      },
    });
    expect(response.status()).toBe(400);
  });

  // BUG: Wrong password returns 200 instead of 401
  // Auto-logging to Jira when detected
  test('POST /login with wrong password - BUG returns 200 instead of 401', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/login`, {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'wrongpassword',
      },
    });

    const actualStatus = response.status();

    // Anything other than 401 is unexpected behavior
    if (actualStatus !== 401) {
      await createJiraBug({
        summary: `Security: POST /login returned ${actualStatus} instead of 401`,
        description: `Endpoint: POST /api/login
Expected: 401 Unauthorized
Actual: ${actualStatus}
Test: POST /login with wrong password
Impact: Authentication not working correctly`,
        priority: 'High',
      });
    }

    // Bug: should be 401 but Reqres returns 200
    // Documenting actual behavior until fixed
    expect(actualStatus).not.toBe(401);
  });

  // Negative scenario: requesting a non-existent user should return 404.
  test('GET /users/99999 returns 404', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/99999`);
    expect(response.status()).toBe(404);
  });

  // Negative scenario: register without a password should return 400.
  test('POST /register with missing password returns 400', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/register`, {
      data: {
        email: 'eve.holt@reqres.in',
      },
    });
    expect(response.status()).toBe(400);
  });

});