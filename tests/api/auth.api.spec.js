const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://reqres.in/api';

test.describe('Auth API', () => {

  test('POST /login - valid credentials should return 200 and token', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/login`, {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('token');
    expect(typeof body.token).toBe('string');
    expect(body.token.length).toBeGreaterThan(0);
  });

  test('POST /login - missing password should return 400 with error message', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/login`, {
      data: {
        email: 'eve.holt@reqres.in',
      },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body).toHaveProperty('error');
    expect(body.error).toBeTruthy();
  });

  test('POST /login - missing email should return 400', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/login`, {
      data: {
        password: 'cityslicka',
      },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body).toHaveProperty('error');
    expect(body.error).toBeTruthy();
  });

  test('POST /register - valid credentials should return 200 with id and token', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/register`, {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('token');
    expect(typeof body.id).toBe('number');
    expect(typeof body.token).toBe('string');
    expect(body.token.length).toBeGreaterThan(0);
  });

  test('POST /register - missing password should return 400 with error', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/register`, {
      data: {
        email: 'eve.holt@reqres.in',
      },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body).toHaveProperty('error');
    expect(body.error).toBeTruthy();
  });

});
