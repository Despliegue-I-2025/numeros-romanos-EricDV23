const request = require('supertest');
const app = require('../server');

describe('API Roman <-> Arabic (robusta)', () => {
  test('GET /api/v1/r2a?roman=XII -> 200 + body', async () => {
    const res = await request(app).get('/api/v1/r2a').query({ roman: 'XII' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ input: 'XII', output: 12 });
  });

  test('GET /api/v1/a2r?arabic=58 -> 200 + body', async () => {
    const res = await request(app).get('/api/v1/a2r').query({ arabic: 58 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ input: 58, output: 'LVIII' });
  });

  test('GET /api/v1/r2a sin query -> 400 RFC7807-like', async () => {
    const res = await request(app).get('/api/v1/r2a');
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('type');
    expect(res.body).toHaveProperty('title');
    expect(res.body.status).toBe(400);
  });

  test('GET /api/v1/r2a?roman=IIV -> 400 con detalle', async () => {
    const res = await request(app).get('/api/v1/r2a').query({ roman: 'IIV' });
    expect(res.statusCode).toBe(400);
    expect(res.body.title).toMatch(/inválido/i);
    expect(res.body).toHaveProperty('instance');
  });

  test('GET /api/v1/a2r?arabic=4000 -> 422 out-of-range', async () => {
    const res = await request(app).get('/api/v1/a2r').query({ arabic: 4000 });
    expect(res.statusCode).toBe(422);
    expect(res.body.title.toLowerCase()).toContain('fuera');
    expect(res.body.status).toBe(422);
  });

  test('GET /api-docs -> 200 HTML swagger', async () => {
    const res = await request(app).get('/api-docs');

    // Swagger UI redirige a /api-docs/ → 301
    expect([200, 301]).toContain(res.statusCode);

    if (res.statusCode === 301 && res.header.location) {
      const res2 = await request(app).get(res.header.location);
      expect(res2.statusCode).toBe(200);
      expect(res2.header['content-type']).toMatch(/html/);
    } else {
      expect(res.header['content-type']).toMatch(/html/);
    }
  });
});
