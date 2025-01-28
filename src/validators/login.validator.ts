import { z } from 'zod';

export const schema = z.object({
    username: z.string().min(1, { message: 'Required' }),
    password: z.string().min(1),
});

export type LoginSchema = z.infer<typeof schema>;
