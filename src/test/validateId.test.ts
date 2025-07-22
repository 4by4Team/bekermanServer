const express = require('express');
const request = require('supertest');
const app = express();
import { validateIdParam } from "../middlewares/validateIdParam.middleware";
describe('validateIdParam middleware', () => {
  app.get('/api/courses/:id', validateIdParam, (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { id: number; }): void; new(): any; }; }; }) => {
    res.status(200).json({ id: Number(req.params.id) });
  });
  it('should pass with valid numeric ID (e.g., 1)', async () => {
    const res = await request(app).get('/api/courses/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: 1 });
  });
  it('should fail with ID 0', async () => {
    const res = await request(app).get('/api/courses/0');
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid ID' });
  });
  it('should fail with negative ID', async () => {
    const res = await request(app).get('/api/courses/-5');
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid ID' });
  });
  it('should fail with non-numeric ID', async () => {
    const res = await request(app).get('/api/courses/abc');
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid ID' });
  });
  it('should fail with decimal ID', async () => {
    const res = await request(app).get('/api/courses/3.14');
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid ID' });
  });
});
