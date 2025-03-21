'use server';

import { prisma } from "@/lib/prisma";


export const getAllTags = async () => {
  try {
    const tags = await prisma.tag.findMany({
      select: { id: true, name: true },
    });
    return { success: true, tags };
  } catch {
    return { success: false, message: 'Failed to fetch tags' };
  }
};
