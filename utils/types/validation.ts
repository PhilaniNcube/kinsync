import {z} from 'zod';

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  first_name: z.string().min(2),
  last_name: z.string().min(2),
})

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const updateProfileSchema = z.object({
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  phone: z.string().min(10),
})

export const createGroupSchema = z.object({
  name: z.string().min(2),
})


export const inviteUserSchema = z.object({
  email: z.string().email(),
  group_id: z.string().uuid(),
})

export const resetPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})
