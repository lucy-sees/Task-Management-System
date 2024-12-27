const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Task = require('../models/Task');
const taskRoutes = require('../routes/tasks');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/api/tasks', taskRoutes);

jest.setTimeout(60000); // Set timeout to 60 seconds for the entire test suite

beforeAll(async () => {
  const url = process.env.MONGODB_URI;
  if (!url) {
    throw new Error('MONGODB_URI is not defined');
  }
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
}, 60000);

afterAll(async () => {
  if (mongoose.connection.db) {
    try {
      await mongoose.connection.db.dropDatabase();
    } catch (error) {
      console.error('Error dropping database:', error.message);
    }
  }
  await mongoose.connection.close();
});

describe('Task API', () => {
  it('should create a new task', async () => {
    const res = await request(app).post('/api/tasks').send({
      title: 'Test Task',
      description: 'This is a test task',
      status: 'pending',
      dueDate: '2024-12-31T23:59:59.000Z',
      userId: new mongoose.Types.ObjectId(),
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should fetch all tasks', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should fetch a task by ID', async () => {
    const task = new Task({
      title: 'Test Task',
      description: 'This is a test task',
      status: 'pending',
      dueDate: '2024-12-31T23:59:59.000Z',
      userId: new mongoose.Types.ObjectId(),
    });
    await task.save();

    const res = await request(app).get(`/api/tasks/${task._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', task._id.toString());
  });

  it('should update a task by ID', async () => {
    const task = new Task({
      title: 'Test Task',
      description: 'This is a test task',
      status: 'pending',
      dueDate: '2024-12-31T23:59:59.000Z',
      userId: new mongoose.Types.ObjectId(),
    });
    await task.save();

    const res = await request(app).put(`/api/tasks/${task._id}`).send({
      title: 'Updated Test Task',
      description: 'This is an updated test task',
      status: 'completed',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Updated Test Task');
  });

  it('should delete a task by ID', async () => {
    const task = new Task({
      title: 'Test Task',
      description: 'This is a test task',
      status: 'pending',
      dueDate: '2024-12-31T23:59:59.000Z',
      userId: new mongoose.Types.ObjectId(),
    });
    await task.save();

    const res = await request(app).delete(`/api/tasks/${task._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Task deleted');
  });
});
