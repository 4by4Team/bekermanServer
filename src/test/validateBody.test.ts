import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import validateBody from '../middlewares/validateBody.middeleware';
import { createArticleSchema, updateArticleSchema } from '../schemas/article.schema';
import { createCategorySchema, updateCategorySchema } from '../schemas/category.schema';
import { createCourseSchema, updateCourseSchema } from '../schemas/course.schema';
import { createTestimonySchema, updateTestimonySchema } from '../schemas/testimony.schema';


const app = express();
app.use(bodyParser.json());

// Helper function to create routes for testing
function setupRoutes() {
    app.post('/articles', validateBody(createArticleSchema), (req, res) => {
        res.status(201).json({ ok: true });
    }
    );
    app.put('/articles/:id', validateBody(updateArticleSchema), (req, res) => {res.status(200).json({ ok: true })});

    app.post('/categories', validateBody(createCategorySchema), (req, res) =>{ res.status(201).json({ ok: true })});
    app.put('/categories/:id', validateBody(updateCategorySchema), (req, res) => {res.status(200).json({ ok: true })});

    app.post('/courses', validateBody(createCourseSchema), (req, res) => {res.status(201).json({ ok: true })});
    app.put('/courses/:id', validateBody(updateCourseSchema), (req, res) =>{ res.status(200).json({ ok: true })});

    app.post('/testimonies', validateBody(createTestimonySchema), (req, res) => {res.status(201).json({ ok: true })});
    app.put('/testimonies/:id', validateBody(updateTestimonySchema), (req, res) => {res.status(200).json({ ok: true })});
}

setupRoutes();

describe('ValidateBody Middleware', () => {
    describe('Article', () => {
        it('POST valid', async () => {
            const res = await request(app).post('/articles').send({
                title: 'Hello World',
                backgroundUrl: 'https://example.com/image.png',
                content: 'This is content',
                categoryId: 1,
                createdBy: 'Alice',
                readTime: 10,
            });
            expect(res.status).toBe(201);
        });

        it('POST invalid missing title', async () => {
            const res = await request(app).post('/articles').send({
                backgroundUrl: 'https://example.com/image.png',
                content: 'This is content',
                categoryId: 1,
                createdBy: 'Alice',
                readTime: 10,
            });
            expect(res.status).toBe(400);
            expect(res.body.error).toContain('Title is required');
        });

        it('PUT valid', async () => {
            const res = await request(app).put('/articles/123').send({
                title: 'Updated Title',
                backgroundUrl: 'https://example.com/image.png',
                content: 'Updated content',
                categoryId: 2,
                updatedBy: 'Bob',
                readTime: 15,
            });
            expect(res.status).toBe(200);
        });

        it('PUT invalid missing updatedBy', async () => {
            const res = await request(app).put('/articles/123').send({
                title: 'Updated Title',
                backgroundUrl: 'https://example.com/image.png',
                content: 'Updated content',
                categoryId: 2,
                readTime: 15,
            });
            expect(res.status).toBe(400);
            expect(res.body.error).toContain('Updater is required');
        });
    });

    // בדיקות דומות לקטגוריה, קורס, עדות...

    describe('Category', () => {
        it('POST valid', async () => {
            const res = await request(app).post('/categories').send({
                categoryName: 'Tech',
                createdBy: 'Alice',
            });
            expect(res.status).toBe(201);
        });

        it('POST invalid missing categoryName', async () => {
            const res = await request(app).post('/categories').send({
                createdBy: 'Alice',
            });
            expect(res.status).toBe(400);
            expect(res.body.error).toContain('Category name is required');
        });

        it('PUT valid', async () => {
            const res = await request(app).put('/categories/123').send({
                categoryName: 'Science',
                updatedBy: 'Bob',
            });
            expect(res.status).toBe(200);
        });

        it('PUT invalid missing updatedBy', async () => {
            const res = await request(app).put('/categories/123').send({
                categoryName: 'Science',
            });
            expect(res.status).toBe(400);
            expect(res.body.error).toContain('Updater is required');
        });
    });

    describe('Course', () => {
        it('POST valid', async () => {
            const res = await request(app).post('/courses').send({
                title: 'Node.js Basics',
                description: 'Learn Node.js from scratch',
                price: 100,
                linkToCourse: 'https://example.com/course',
                backgroundUrl: 'https://example.com/image.png',
                createdBy: 'Alice',
            });
            expect(res.status).toBe(201);
        });

        it('POST invalid missing title', async () => {
            const res = await request(app).post('/courses').send({
                description: 'Learn Node.js',
                price: 100,
                linkToCourse: 'https://example.com/course',
                backgroundUrl: 'https://example.com/image.png',
                createdBy: 'Alice',
            });
            expect(res.status).toBe(400);
            expect(res.body.error).toContain('Title is required');
        });

        it('PUT valid', async () => {
            const res = await request(app).put('/courses/123').send({
                title: 'Node.js Advanced',
                description: 'Deep dive into Node.js',
                price: 150,
                linkToCourse: 'https://example.com/course',
                backgroundUrl: 'https://example.com/image.png',
                updatedBy: 'Bob',
            });
            expect(res.status).toBe(200);
        });

        it('PUT invalid missing updatedBy', async () => {
            const res = await request(app).put('/courses/123').send({
                title: 'Node.js Advanced',
                description: 'Deep dive into Node.js',
                price: 150,
                linkToCourse: 'https://example.com/course',
                backgroundUrl: 'https://example.com/image.png',
            });
            expect(res.status).toBe(400);
            expect(res.body.error).toContain('Updater is required');
        });
    });

    describe('Testimony', () => {
        it('POST valid', async () => {
            const res = await request(app).post('/testimonies').send({
                title: 'Great experience',
                summary: 'This course changed my life.',
                youtubeId: 'https://youtube.com/example',
                createdBy: 'Alice',
            });
            expect(res.status).toBe(201);
        });

        it('POST invalid missing title', async () => {
            const res = await request(app).post('/testimonies').send({
                summary: 'Good',
                youtubeId: 'https://youtube.com/example',
                createdBy: 'Alice',
            });
            expect(res.status).toBe(400);
            expect(res.body.error).toContain('Title is required');
        });

        it('PUT valid', async () => {
            const res = await request(app).put('/testimonies/123').send({
                title: 'Updated title',
                summary: 'Updated summary',
                youtubeId: 'https://youtube.com/example',
                updatedBy: 'Bob',
            });
            expect(res.status).toBe(200);
        });

        it('PUT invalid missing updatedBy', async () => {
            const res = await request(app).put('/testimonies/123').send({
                title: 'Updated title',
                summary: 'Updated summary',
                youtubeId: 'https://youtube.com/example',
            });
            expect(res.status).toBe(400);
            expect(res.body.error).toContain('Updater is required');
        });
    });
});
