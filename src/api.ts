import { z } from 'zod';

const broadcastResponseSchema = z.array(
    z.object({
        stream: z
            .object({
                id: z.string(),
                title: z.string(),
                createdAt: z.string(),
            })
            .or(z.null()),
    })
);

export const getBroadcast = async (login: string) => {
    const url = new URL('https://api.ivr.fi/v2/twitch/user');
    url.searchParams.append('login', login);

    const response = await fetch(url, {
        headers: { accept: 'application/json' },
    });

    if (response.status !== 200) {
        throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    const schemaResult = broadcastResponseSchema.safeParse(data);

    if (!schemaResult.success) {
        throw new Error('Invalid data');
    }

    if (!schemaResult.data[0]) {
        return null;
    }

    return schemaResult.data[0];
};
