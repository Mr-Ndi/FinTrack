import { PrismaClient, Category } from "@prisma/client";

export class CategoryModel {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * Create a new category.
   * @param name - The name of the category.
   * @param parentId - The ID of the parent category (optional).
   * @returns The newly created category.
   */
  async createCategory(name: string, parentId?: number): Promise<Category> {
    return this.prisma.category.create({
      data: {
        name,
        parentId,
      },
    });
  }

  /**
   * Get a category by its ID.
   * @param id - The ID of the category.
   * @returns The category or null if not found.
   */
  // async getCategoryById(id: number): Promise<Category | null> {
  //   return this.prisma.category.findUnique({
  //     where: { id },
  //     include: {
  //       parent: true,
  //       children: true,
  //       transactions: true,
  //       budgets: true,
  //     },
  //   });
  // }

  /**
   * Update a category by its ID.
   * @param id - The ID of the category to update.
   * @param data - The data to update (e.g., name or parentId).
   * @returns The updated category.
   */
  async updateCategory(id: number, data: Partial<Category>): Promise<Category> {
    return this.prisma.category.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete a category by its ID.
   * @param id - The ID of the category to delete.
   * @returns The deleted category.
   */
  async deleteCategory(id: number): Promise<Category> {
    return this.prisma.category.delete({
      where: { id },
    });
  }

  /**
   * Get all categories.
   * @returns An array of all categories.
   */
  async getAllCategories(): Promise<Category[]> {
    return this.prisma.category.findMany({
      include: {
        parent: true,
        children: true,
        transactions: true,
        budgets: true,
      },
    });
  }

  /**
   * Close the Prisma client connection.
   */
  async disconnect(): Promise<void> {
    await this.prisma.$disconnect();
  }
}
