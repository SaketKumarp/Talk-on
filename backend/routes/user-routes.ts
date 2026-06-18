import { Router } from "express";
import { getUser } from "../controllers/user-controllers";
import { auth } from "../config/middleware";
 

const router = Router();

router.get("/me",auth, getUser);
 

export default router;