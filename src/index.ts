import { Hono } from 'hono';
import { poweredBy } from 'hono/powered-by';

const app = new Hono();

app.use('*', poweredBy());

app.get('/', (ctx) => {
    return ctx.text('Hello Hono!');
});

export default app;
