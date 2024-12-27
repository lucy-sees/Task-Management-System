const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const userRoutes = require('../routes/users');
require('dotenv').config(); // Load environment variables from .env

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

jest.setTimeout(60000); // Set timeout to 60 seconds for the entire test suite

beforeAll(async () => {
  const url = process.env.MONGODB_URI;
  if (!url) {
    throw new Error('MONGODB_URI is not defined');
  }
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
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

describe('User API', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should fetch all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should fetch a user by ID', async () => {
    const user = new User({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123'
    });
    await user.save();

    const res = await request(app).get(`/api/users/${user._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', user._id.toString());
  });

  it('should update a user by ID', async () => {
    const user = new User({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123'
    });
    await user.save();

    const res = await request(app)
      .put(`/api/users/${user._id}`)
      .send({
        name: 'Jane Doe',
        email: 'jane.doe@example.com'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Jane Doe');
  });

  it('should delete a user by ID', async () => {
    const user = new User({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123'
    });
    await user.save();

    const res = await request(app).delete(`/api/users/${user._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User deleted');
  });
});