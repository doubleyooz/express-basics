import { z } from 'zod';


const email = z.string().email().min(1, 'email is required')
const password = z.string().min(8, 'password must be at least 8 characters long');
const name = z.string().min(3, 'name is required');

const _id = z.string().refine((value) => /^[0-9a-fA-F]{24}$/.test(value), {
    message: "Invalid MongoDB ObjectID",
});

export const loginSchema = z.object({
    email: email,
    password,
});

export const createUserSchema = z.object({
    email,
    password,
    name,
})

export const findByIdSchema = z.object({
    _id
})


export const findAllSchema = z.object({
    email: email.optional(),
    name: email.optional(),
})


export const updateUserSchema = z.object({
    email: email.optional(),
    name: email.optional(),
})
