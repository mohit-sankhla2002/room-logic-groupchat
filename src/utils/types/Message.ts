import { z } from 'zod';

export const MessageValidator = z.object({
    type: z.enum(["JOIN", "EXIT", "MSG", "DESTROY"]),
    payload: z.string()
})

export type Message = z.infer<typeof MessageValidator>;