import { Request, Response } from "express";
 
import User from "../models/user";
import { AuthRequest } from "../types";

export const getUser = async (req: AuthRequest, res: Response): Promise<void> => {
  // figure out how to getUser
  try {
    const user = await User.findById(req.user?.userId).select("-password");
    if (!user) {
      res.status(404).json({
        message: "user does not exists",
      });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("error while getting error", error);
  }
};