import express from "express";
import {
    createCategory,
    // getCategoryById,
    // getAllCategories,
    updateCategory,
    deleteCategory
} from "../controllers/CategoryController";

const router = express.Router();
router.post("/categories", createCategory);
// router.get("/categories/:categoryId", getCategoryById);
// router.get("/categories", getAllCategories);
router.put("/categories/:categoryId", updateCategory);
router.delete("/categories/:categoryId", deleteCategory);

export default router;
