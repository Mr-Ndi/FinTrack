import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class categories{
    async getAllCategories() {
        try {
          const categories = await prisma.category.findMany({
            where: {
              parent: null, // Fetch top-level categories
            },
            include: {
              children: true, // Include immediate children
            },
          });
          console.log('Categories retrieved successfully:', categories);
          return categories;
        } catch (error) {
          console.error('Failed to retrieve categories:', (error as Error).message);
          throw error;
        }
      }      
}