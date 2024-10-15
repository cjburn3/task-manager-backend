import request from 'supertest';
import app from '../index';
import { supabase } from '../supabaseClient';

const createTestTask = async () => {
    const response = await request(app)
        .post('/api/tasks')
        .send({ title: 'Test Task' });
    return response.body;
};

describe('Task Routes', () => {
    let testTaskId: string;

    afterAll(async () => {

        if (testTaskId) {
            await request(app).delete(`/api/tasks/${testTaskId}`);
        }
        await supabase.auth.signOut();
    });

    it('should create a new task', async () => {
        const response = await request(app)
            .post('/api/tasks')
            .send({ title: 'New Task' });
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe('New Task');
        testTaskId = response.body.id;
    });

    it('should get all tasks', async () => {
        const response = await request(app).get('/api/tasks');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should get a task by ID', async () => {
        const task = await createTestTask();
        const response = await request(app).get(`/api/tasks/${task.id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(task.id);
    });

    it('should update a task', async () => {
        const task = await createTestTask();
        const response = await request(app)
            .put(`/api/tasks/${task.id}`)
            .send({ title: 'Updated Task', completed: true });
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe('Updated Task');
        expect(response.body.completed).toBe(true);
    });

    it('should delete a task', async () => {
        const task = await createTestTask();
        const response = await request(app).delete(`/api/tasks/${task.id}`);
        expect(response.statusCode).toBe(204);
    });

    it('should return 400 if title is missing', async () => {
        const response = await request(app)
            .post('/api/tasks')
            .send({ title: '' });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Title is required');
    });

    it('should return 404 for updating non-existent task', async () => {
        const response = await request(app)
            .put('/api/tasks/invalid-id')
            .send({ title: 'Updated Task' });
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Task not found');
    });

    it('should return 404 for deleting non-existent task', async () => {
        const response = await request(app).delete('/api/tasks/invalid-id');
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Task not found');
    });

    it('should toggle task completion', async () => {
        const task = await createTestTask();
        const response = await request(app)
            .put(`/api/tasks/${task.id}`)
            .send({ completed: !task.completed });
        expect(response.statusCode).toBe(200);
        expect(response.body.completed).toBe(!task.completed);
    });

    it('should filter tasks by completion status', async () => {
        await createTestTask();
        const response = await request(app).get('/api/tasks?completed=true');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        response.body.forEach((task: any) => {
            expect(task.completed).toBe(true);
        });
    });
});
