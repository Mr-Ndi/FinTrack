import { CategoryModel } from "../models/Category.model";

const categoryModel = new CategoryModel();

export class CategoryService {
  /**
   * Creates a new category.
   * 
   * @param name - The name of the category.
   * @param parentId - Optional: The ID of the parent category.
   */
  async createCategory(name: string, parentId?: number) {
    try {
      const category = await categoryModel.createCategory(name, parentId);
      console.log("Category created successfully:", category);
      return category; // Return the created category
    } catch (error: any) {
      console.log(`Error occurred while creating category: ${error.message}`);
      throw error; // Rethrow the error for upstream handling
    }
  }

  /**
   * Retrieve a category by its ID.
   * 
   * @param id - The ID of the category to retrieve.
   */
//   async getCategoryById(id: number) {
//     try {
//       const category = await categoryModel.getCategoryById(id);
//       if (!category) {
//         throw new Error(`Category with ID ${id} not found.`);
//       }
//       console.log("Category retrieved successfully:", category);
//       return category;
//     } catch (error: any) {
//       console.log(`Error occurred while retrieving category: ${error.message}`);
//       throw error;
//     }
//   }

  /**
   * Retrieve all categories.
   */
//   async getAllCategories() {
//     try {
//       const categories = await categoryModel.getAllCategories();
//       console.log("All categories retrieved successfully:", categories);
//       return categories;
//     } catch (error: any) {
//       console.log(`Error occurred while retrieving categories: ${error.message}`);
//       throw error;
//     }
//   }

  /**
   * Update a category by its ID.
   * 
   * @param id - The ID of the category to update.
   * @param data - The data to update (e.g., name or parentId).
   */
  async updateCategory(id: number, data: Partial<{ name: string; parentId?: number }>) {
    try {
      const updatedCategory = await categoryModel.updateCategory(id, data);
      console.log("Category updated successfully:", updatedCategory);
      return updatedCategory;
    } catch (error: any) {
      console.log(`Error occurred while updating category: ${error.message}`);
      throw error;
    }
  }

  /**
   * Delete a category by its ID.
   * 
   * @param id - The ID of the category to delete.
   */
  async deleteCategory(id: number) {
    try {
      const deletedCategory = await categoryModel.deleteCategory(id);
      console.log("Category deleted successfully:", deletedCategory);
      return deletedCategory;
    } catch (error: any) {
      console.log(`Error occurred while deleting category: ${error.message}`);
      throw error;
    }
  }
}
