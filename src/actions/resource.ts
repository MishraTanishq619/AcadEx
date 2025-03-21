'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { z } from 'zod';

const resourceSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  fileUrl: z.string().url('Invalid file URL'),
  categoryId: z.string(),
  tags: z.array(z.string()),
});

export const createResource = async (data: z.infer<typeof resourceSchema>) => {
  try {
    // Validate incoming data
    const validatedData = resourceSchema.parse(data);

    // Get authenticated user
    const userId = await auth();
    if (!userId) return { success: false, message: 'Unauthorized' };

    // Create resource in the database
    const newResource = await prisma.resource.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        fileUrl: validatedData.fileUrl,
        categoryId: validatedData.categoryId,
        userId: userId,
        tags: {
          create: validatedData.tags.map((tag) => ({ name: tag })),
        },
      },
    });

    return { success: true, message: 'Resource created successfully', resource: newResource };
  } catch (error: any) {
    console.error('Error creating resource:', error);
    return { success: false, message: error.message || 'Something went wrong' };
  }
};
