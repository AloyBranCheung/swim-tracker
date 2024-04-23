import { z } from 'zod';

export const CreateSwimActivitySchema = z.object({
    swimDistance: z.coerce.number().min(1)
})