require('dotenv').config({ path: '.env' }); 
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../server');
const User = require('../Models/User');
const { connect, closeDatabase, clearDatabase } = require('./setup');

let accessToken;

beforeAll(async () => {
  await connect();

  // create a test user
  const user = await User.create({
    name: 'Book User',
    email: 'bookuser@example.com',
    password: 'password123',
  });

  // generate a test access token
  accessToken = jwt.sign({ sub: user._id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' });
});

afterAll(async () => {
  await closeDatabase();
});

afterEach(async () => {
  await clearDatabase();
});

describe('Books API', () => {
  let bookId;

  it('should create a book', async () => {
    const res = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ title: 'Test Book', author: 'Author A', year: 2025, genre: 'Fiction' });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Book');
    bookId = res.body._id;
  });

  it('should get books', async () => {
    await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ title: 'Test Book', author: 'Author A' });

    const res = await request(app)
      .get('/api/books')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBe(1);
  });

  it('should get a single book', async () => {
    const createRes = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ title: 'Book Single', author: 'Author B' });

    const res = await request(app)
      .get(`/api/books/${createRes.body._id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Book Single');
  });

  it('should update a book', async () => {
    const createRes = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ title: 'Old Title', author: 'Author C' });

    const res = await request(app)
      .put(`/api/books/${createRes.body._id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ title: 'New Title' });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('New Title');
  });

  it('should delete a book', async () => {
    const createRes = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ title: 'Delete Me', author: 'Author D' });

    const res = await request(app)
      .delete(`/api/books/${createRes.body._id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Book deleted');
  });
});
