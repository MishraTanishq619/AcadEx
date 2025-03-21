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


    const newResource = await prisma.resource.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        fileUrl: validatedData.fileUrl,
        categoryId: validatedData.categoryId,
        userId: userId,
        tags: {
          connect: validatedData.tags.map((tagId) => ({
            id: tagId,
          })),
        },
      },
    });

    return { success: true, message: 'Resource created successfully', resource: newResource };
  } catch (error: any) {
    console.error('Error creating resource:', error);
    return { success: false, message: error.message || 'Something went wrong' };
  }
};

export async function getAllResources() {
  try {
    const resources = await prisma.resource.findMany({
      include: {
        category: true,
        tags: true,
      },
    });

    return {
      success: true,
      resources: resources.map((resource) => ({
        id: resource.id,
        title: resource.title,
        description: resource.description,
        category: resource.category.name,
        tags: resource.tags.map((tag) => tag.name),
        fileUrl: resource.fileUrl,
      })),
    };
  } catch {
    return { success: false, message: 'Error fetching resources' };
  }
}


export async function getUserResources() {
  try {
    const userId = await auth();
    if (!userId) return { success: false, message: 'Unauthorized' };

    const resources = await prisma.resource.findMany({
      where: { userId: userId },
      include: { category: true, tags: true },
    });

    return {
      success: true,
      resources: resources.map((resource) => ({
        id: resource.id,
        title: resource.title,
        description: resource.description,
        category: resource.category.name,
        tags: resource.tags.map((tag) => tag.name),
        fileUrl: resource.fileUrl,
      })),
    };
  }catch {
    return { success: false, message: 'Error fetching user resources' };
  }
}
