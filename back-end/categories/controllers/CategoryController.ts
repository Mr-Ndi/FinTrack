import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CategoryService } from "../services/CategoryService";

const categoryService = new CategoryService();

/**
 * Controller to create a new category.
 * 
 * @param req - Express Request object
 * @param res - Express Response object
 */
export const createCategory = async (req: Request, res: Response): Promise<any> => {
    const { name, parentId } = req.body;

    try {
        const token = req.headers['authorization']?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "No authorization token provided." });
        }

        let decoded: any;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        } catch (err) {
            return res.status(401).json({ message: "Invalid or expired token." });
        }

        const userId = decoded.userId;

        const category = await categoryService.createCategory(name, parentId);

        return res.status(201).json({ message: "Category created successfully.", category });
    } catch (error: any) {
        console.log(`Error occurred while creating category: ${error.message}`);
        return res.status(500).json({ message: `Error occurred while creating category: ${error.message}` });
    }
};

/**
 * Controller to retrieve a category by its ID.
 * 
 * @param req - Express Request object
 * @param res - Express Response object
 */
// export const getCategoryById = async (req: Request, res: Response): Promise<any> => {
//     const { categoryId } = req.params;

//     try {
//         const token = req.headers['authorization']?.split(" ")[1];

//         if (!token) {
//             return res.status(401).json({ message: "No authorization token provided." });
//         }

//         let decoded: any;
//         try {
//             decoded = jwt.verify(token, process.env.JWT_SECRET as string);
//         } catch (err) {
//             return res.status(401).json({ message: "Invalid or expired token." });
//         }

//         const category = await categoryService.getCategoryById(Number(categoryId));

//         if (!category) {
//             return res.status(404).json({ message: `Category with ID ${categoryId} not found.` });
//         }

//         return res.status(200).json({ message: "Category retrieved successfully.", category });
//     } catch (error: any) {
//         console.log(`Error occurred while retrieving category: ${error.message}`);
//         return res.status(500).json({ message: `Error occurred while retrieving category: ${error.message}` });
//     }
// };

/**
 * Controller to retrieve all categories.
 * 
 * @param req - Express Request object
 * @param res - Express Response object
 */
// export const getAllCategories = async (req: Request, res: Response): Promise<any> => {
//     try {
//         const token = req.headers['authorization']?.split(" ")[1];

//         if (!token) {
//             return res.status(401).json({ message: "No authorization token provided." });
//         }

//         let decoded: any;
//         try {
//             decoded = jwt.verify(token, process.env.JWT_SECRET as string);
//         } catch (err) {
//             return res.status(401).json({ message: "Invalid or expired token." });
//         }

//         const categories = await categoryService.getAllCategories();

//         return res.status(200).json({ message: "Categories retrieved successfully.", categories });
//     } catch (error: any) {
//         console.log(`Error occurred while retrieving categories: ${error.message}`);
//         return res.status(500).json({ message: `Error occurred while retrieving categories: ${error.message}` });
//     }
// };

/**
 * Controller to update a category by its ID.
 * 
 * @param req - Express Request object
 * @param res - Express Response object
 */
export const updateCategory = async (req: Request, res: Response): Promise<any> => {
    const { categoryId } = req.params;
    const { name, parentId } = req.body;

    try {
        const token = req.headers['authorization']?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "No authorization token provided." });
        }

        let decoded: any;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        } catch (err) {
            return res.status(401).json({ message: "Invalid or expired token." });
        }

        const updatedCategory = await categoryService.updateCategory(Number(categoryId), { name, parentId });

        return res.status(200).json({ message: "Category updated successfully.", updatedCategory });
    } catch (error: any) {
        console.log(`Error occurred while updating category: ${error.message}`);
        return res.status(500).json({ message: `Error occurred while updating category: ${error.message}` });
    }
};

/**
 * Controller to delete a category by its ID.
 * 
 * @param req - Express Request object
 * @param res - Express Response object
 */
export const deleteCategory = async (req: Request, res: Response): Promise<any> => {
    const { categoryId } = req.params;

    try {
        const token = req.headers['authorization']?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "No authorization token provided." });
        }

        let decoded: any;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        } catch (err) {
            return res.status(401).json({ message: "Invalid or expired token." });
        }

        const deletedCategory = await categoryService.deleteCategory(Number(categoryId));

        return res.status(200).json({ message: "Category deleted successfully.", deletedCategory });
    } catch (error: any) {
        console.log(`Error occurred while deleting category: ${error.message}`);
        return res.status(500).json({ message: `Error occurred while deleting category: ${error.message}` });
    }
};
