import { Hono } from 'hono';
import { poweredBy } from 'hono/powered-by';
import { getBroadcast } from './api';
import { makeTimestamp } from './utils';

const app = new Hono();

app.use('*', poweredBy());

app.get('/plaintext/:login', async (ctx) => {
    const { login } = ctx.req.param();
    const broadcast = await getBroadcast(login);

    if (!broadcast?.stream?.createdAt) {
        return ctx.text(`Channel is currently offline.`);
    }

    const startedAt = new Date(broadcast.stream.createdAt);
    const now = new Date();

    const { humanReadable, queryParameter } = makeTimestamp(now, startedAt);
    const url = new URL(`https://www.twitch.tv/videos/${broadcast.stream.id}`);
    url.searchParams.append('t', queryParameter);

    return ctx.text(`Timestamp for ${humanReadable}. ${url.href}`, 200);
});

app.get('/json/:login', async (ctx) => {
    const { login } = ctx.req.param();
    const broadcast = await getBroadcast(login);

    if (!broadcast?.stream?.createdAt) {
        return ctx.json({ error: 'Channel is currently offline.' });
    }

    const startedAt = new Date(broadcast.stream.createdAt);
    const now = new Date();
    const { humanReadable, queryParameter } = makeTimestamp(now, startedAt);

    return ctx.json({ data: { ...broadcast, humanReadable, queryParameter } });
});

export default app;
