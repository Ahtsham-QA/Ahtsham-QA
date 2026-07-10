const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://reqres.in/api';

test.describe('Chained API flow', () => {
  test('login and use token to fetch a user', async ({ request }) => {
    const loginResponse = await request.post(`${BASE_URL}/login`, {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      },
    });

    expect(loginResponse.status()).toBe(200);
    const loginBody = await loginResponse.json();
    expect(loginBody).toHaveProperty('token');

    const token = loginBody.token;
    console.log(`Token captured: ${token}`);

    const userResponse = await request.get(`${BASE_URL}/users/2`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(userResponse.status()).toBe(200);
    const userBody = await userResponse.json();
    expect(userBody.data.id).toBe(2);
  });

  test('login, create a user, and fetch user 2 with token', async ({ request }) => {
    const loginResponse = await request.post(`${BASE_URL}/login`, {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      },
    });

    expect(loginResponse.status()).toBe(200);
    const loginBody = await loginResponse.json();
    expect(loginBody).toHaveProperty('token');

    const token = loginBody.token;
    console.log(`Token captured: ${token}`);

    const createUserResponse = await request.post(`${BASE_URL}/users`, {
      data: {
        name: 'Ahtsham',
        job: 'QA Lead',
      },
    });

    expect(createUserResponse.status()).toBe(201);
    const createUserBody = await createUserResponse.json();
    expect(createUserBody).toHaveProperty('id');

    const userId = createUserBody.id;
    console.log(`User id captured: ${userId}`);

    const getUserResponse = await request.get(`${BASE_URL}/users/2`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(getUserResponse.status()).toBe(200);
    const getUserBody = await getUserResponse.json();
    expect(getUserBody.data.id).toBe(2);
  });
});
