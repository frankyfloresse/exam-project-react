import { z } from 'zod';

export const searchSchema = z.object({
    search: z.string().min(1, { message: 'Required' }),
});

export type SearchSchema = z.infer<typeof searchSchema>;
