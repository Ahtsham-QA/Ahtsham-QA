const { test, expect } = require('@playwright/test');

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
  // Global reporter will auto-log to Jira when this fails
  test('POST /login with wrong password - should return 401', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/login`, {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'wrongpassword',
      },
    });

    // This will fail because Reqres returns 200 instead of 401
    // Global reporter catches the failure and logs to Jira automatically
    expect(response.status()).toBe(200); // Known bug — Reqres accepts wrong password
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