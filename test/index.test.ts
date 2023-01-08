import app from '../src';

describe('Test the application', () => {
    it('Should return 200 response', async () => {
        const res = await app.request('http://localhost/plaintext/yassuo');
        expect(res.status).toBe(200);
    });
});
