import express  from "express";
import { createUser, loginUser } from "../controllers/AuthController";
import { authenticateToken } from "../middleware/AuthMiddleWare";

const router = express.Router()

router.post("/user", createUser)
router.post("/login", loginUser)
router.get("/protected", authenticateToken, (req, res) => {
    res.json({ message: "This is a protected route.", user: (req as any).user });
  });

export default router;