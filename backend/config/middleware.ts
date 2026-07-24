import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types";

interface JwtPayload {
  userId: string;
}

export const auth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        message: "Authorization token missing",
      });
      return;
    }

    const token = authHeader.split(" ")[1];

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not configured");
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;

    req.user = {
      userId: decoded.userId,
    };

    return next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        message: "Token expired",
      });
      return;
    }

    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        message: "Invalid token",
      });
      return;
    }

    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};
