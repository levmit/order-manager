import request from 'supertest';
import { app } from '../../src/app';

describe('Order API', () => {
    let server: any;

    beforeAll(() => {
        // Start the server before all tests
        server = app.listen(3000);
    });

    afterAll(() => {
        // Close the server after all tests
        server.close();
    });

    it('should get the current order state', async () => {
        const res = await request(server).get('/order/state');
        expect(res.status).toBe(200);
        expect(res.body.state).toBe('created');
    });

    it('should transition the order state', async () => {
        const res = await request(server)
            .post('/order/transition')
            .send({ event: 'CONFIRM' });
        expect(res.status).toBe(200);
        expect(res.body.state).toBe('confirmed');
    });

    it('should return 400 for invalid event', async () => {
        const res = await request(server)
            .post('/order/transition')
            .send({ event: 'INVALID' });
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Invalid event');
    });
});