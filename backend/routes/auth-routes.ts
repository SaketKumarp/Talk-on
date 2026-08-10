import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth-controller";

const router = Router();

router.post("/register", registerUser);
router.post('/login', loginUser)
// so i have to make it scalable hence i will be using rabit mq and also creating an emial service 

export default router