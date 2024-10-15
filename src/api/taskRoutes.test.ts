import request from 'supertest';
import app from '../index';

describe('Task API', () => {
    it('should fetch all tasks', async () => {
        const response = await request(app).get('/api/tasks');
        expect(response.status).toBe(200);
    });

    it('should create a new task', async () => {
        const response = await request(app)
            .post('/api/tasks')
            .send({ title: 'Test Task' });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    });

    // Add more tests for update and delete
});
