'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function registerUser(formData: unknown) {
  try {
    const data = registerSchema.parse(formData);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create new user with role as STUDENT
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password, // Store plain password for now
        role: 'STUDENT',
      },
    });

    // Generate JWT token with 1-hour expiration
    const token = jwt.sign({ userId: user.id }, process.env.NEXT_PUBLIC_JWT_SECRET!, { expiresIn: '1h' });

    return { success: true, message: 'User registered successfully', user, authToken: token };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : 'Registration failed' };
  }
}


const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function loginUser(formData: unknown) {
  try {
    const data = loginSchema.parse(formData);

    // Find user by email
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user || user.password !== data.password) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT token with 1-hour expiration
    const token = jwt.sign({ userId: user.id }, process.env.NEXT_PUBLIC_JWT_SECRET!, { expiresIn: '1h' });

    return { success: true, message: 'Login successful', authToken: token };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : 'Login failed' };
  }
}



export async function getUserDetails() {
  try {
    const userId = await auth();
    if (!userId) return { success: false, message: 'Unauthorized' };

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true, role: true },
    });

    if (!user) return { success: false, message: 'User not found' };

    return { success: true, user };
  } catch {
    return { success: false, message: 'Error fetching user details' };
  }
}
