const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://reqres.in/api';

test.describe('Users API', () => {

  test('GET /users - should return user list', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users?page=1`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data).toBeInstanceOf(Array);
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('GET /users/:id - should return single user', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/2`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data.id).toBe(2);
    expect(body.data.email).toBeTruthy();
  });

  test('GET /users/:id - should return 404 for non-existent user', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/9999`);
    expect(response.status()).toBe(404);
  });

  test('POST /users - should create a new user', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/users`, {
      data: { name: 'Mr Ahtsham', job: 'QA Automation Lead' },
    });
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.name).toBe('Mr Ahtsham');
    expect(body.job).toBe('QA Automation Lead');
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('createdAt');
  });

  test('PUT /users/:id - should fully update a user', async ({ request }) => {
    const response = await request.put(`${BASE_URL}/users/2`, {
      data: { name: 'Ahtsham Status Updated', job: 'Senior QA Consultant' },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.name).toBe('Ahtsham Status Updated');
    expect(body).toHaveProperty('updatedAt');
  });

  test('PATCH /users/:id - should partially update a user', async ({ request }) => {
    const response = await request.patch(`${BASE_URL}/users/2`, {
      data: { job: 'Lead QA Engineer' },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.job).toBe('Lead QA Engineer');
  });

  test('DELETE /users/:id - should return 204', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/users/2`);
    expect(response.status()).toBe(204);
  });

});
