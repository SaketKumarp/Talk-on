import { Router } from "express";
import { loginUser, registerUser, verifyEmail } from "../controllers/auth-controller";

const router = Router();

router.post("/register", registerUser);
router.post('/login', loginUser)
router.post('/verify-otp',verifyEmail)
 

export default router