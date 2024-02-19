import express from "express";
import AuthController from "../controllers/authController";

const router = express.Router();

router.post("/signup", AuthController.signup);
router.post("/signin", AuthController.signin);
router.get("/profile", AuthController.authChecker, AuthController.getProfile);

export default router;
