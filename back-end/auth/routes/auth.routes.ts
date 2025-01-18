import express  from "express";
import { createUser } from "../controllers/AuthController";

const router = express.Router()

router.post("/new_user", createUser)

export default router;