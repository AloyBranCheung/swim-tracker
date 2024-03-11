import { z } from 'zod';

export const PostStatusSchema = z.object({
    msg: z.string().min(1).max(280)
})