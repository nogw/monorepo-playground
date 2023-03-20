import { z } from 'zod';

const registerSchema = z.object({
  email: z
    .string()
    .min(5, { message: 'Email must be at least 5 characters long' })
    .max(255)
    .email('Email must be a valid email'),
  username: z.string().min(4, { message: 'Username must be at least 4 characters long' }).max(24),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});

export default registerSchema;
