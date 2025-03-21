'use server';

import { prisma } from '@/lib/prisma';

export const getAllCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      select: { id: true, name: true },
    });
    return { success: true, categories };
  } catch {
    return { success: false, message: 'Failed to fetch categories' };
  }
};
