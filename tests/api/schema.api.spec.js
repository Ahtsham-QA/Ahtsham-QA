const { test, expect } = require('@playwright/test');
const Ajv = require('ajv');

const BASE_URL = 'https://reqres.in/api';
const ajv = new Ajv({ allErrors: true, strict: false });
const reqresHeaders = {
  'x-api-key': process.env.REQRES_API_KEY || '',
};

function expectSchema(body, schema, description) {
  const validate = ajv.compile(schema);
  const valid = validate(body);
  expect(valid, `${description}: ${ajv.errorsText(validate.errors)}`).toBe(true);
}

test.describe('Reqres schema validation API tests', () => {

  // Check the single-user response shape for the required data and support fields.
  test('GET /users/2 validates the single-user response schema', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/2`, {
      headers: reqresHeaders,
    });

    expect(response.status()).toBe(200);
    const body = await response.json();

    const singleUserSchema = {
      type: 'object',
      required: ['data', 'support'],
      properties: {
        data: {
          type: 'object',
          required: ['id', 'email', 'first_name', 'last_name', 'avatar'],
          properties: {
            id: { type: 'number' },
            email: { type: 'string' },
            first_name: { type: 'string' },
            last_name: { type: 'string' },
            avatar: { type: 'string' },
          },
        },
        support: {
          type: 'object',
          required: ['url', 'text'],
          properties: {
            url: { type: 'string' },
            text: { type: 'string' },
          },
        },
      },
    };

    expectSchema(body, singleUserSchema, 'Single user response schema');
  });

  // Check the create-user response shape for the expected string fields.
  test('POST /users validates the create-user response schema', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/users`, {
      headers: reqresHeaders,
      data: {
        name: 'morpheus',
        job: 'leader',
      },
    });

    expect(response.status()).toBe(201);
    const body = await response.json();

    const createUserSchema = {
      type: 'object',
      required: ['name', 'job', 'id', 'createdAt'],
      properties: {
        name: { type: 'string' },
        job: { type: 'string' },
        id: { type: 'string' },
        createdAt: { type: 'string' },
      },
    };

    expectSchema(body, createUserSchema, 'Create user response schema');
  });

  // Check the paged user list response shape and the structure of each item in data.
  test('GET /users?page=1 validates the user-list response schema', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users?page=1`, {
      headers: reqresHeaders,
    });

    expect(response.status()).toBe(200);
    const body = await response.json();

    const userListSchema = {
      type: 'object',
      required: ['page', 'per_page', 'total', 'total_pages', 'data'],
      properties: {
        page: { type: 'number' },
        per_page: { type: 'number' },
        total: { type: 'number' },
        total_pages: { type: 'number' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            required: ['id', 'email'],
            properties: {
              id: { type: 'number' },
              email: { type: 'string' },
            },
          },
        },
      },
    };

    expectSchema(body, userListSchema, 'User list response schema');
  });
});
