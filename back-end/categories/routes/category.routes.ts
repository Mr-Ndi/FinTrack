import express from "express";
import {
    createCategory,
    // getCategoryById,
    getAllCategories,
    updateCategory,
    deleteCategory
} from "../controllers/CategoryController";

const categoryRouter = express.Router();
categoryRouter.post("/categories", createCategory);
// categoryRouter.get("/categories/:categoryId", getCategoryById);
categoryRouter.get("/categories", getAllCategories);
categoryRouter.put("/categories/:categoryId", updateCategory);
categoryRouter.delete("/categories/:categoryId", deleteCategory);

export default categoryRouter;
