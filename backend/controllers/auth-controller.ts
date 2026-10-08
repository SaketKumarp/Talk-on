import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { getRabbitMqChannel } from "../config/rabbitmq";
import { redisClient } from "..";

const generateToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
};

export const registerUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, email, password, avatar } = req.body;

    // Validation
    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "Name, email and password are required.",
      });
      return;
    }

    // Password Strength
    if (password.length < 8) {
      res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long.",
      });
      return;
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(409).json({
        success: false,
        message: "User already exists.",
      });
      return;
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      avatar,
      isVerified: false,
    });

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("otp is  :", otp)

    // Store OTP in Redis for 5 minutes
    await redisClient.set(`otp:${user.email}`, otp, {
      EX: 3600,
    });

    // Get RabbitMQ channel
    const channel = getRabbitMqChannel();

    // Send OTP job to RabbitMQ
    channel.sendToQueue(
      "emailQueue",
      Buffer.from(
        JSON.stringify({
          type: "otp",
          email: user.email,
         otp
        }),
      ),
      {
        persistent: true,
      },
    );

    console.log(`OTP generated for ${user.email}`);

    // Do NOT generate JWT yet
    // User must verify OTP first

    res.status(201).json({
      success: true,
      message: "Registration successful. OTP sent to your email.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// VERIFY EMAIL OTP
export const verifyEmail = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { email, otp } = req.body;

    // Validation
    if (!email || !otp) {
      res.status(400).json({
        success: false,
        message: "Email and OTP are required.",
      });
      return;
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found.",
      });
      return;
    }

    // Check if already verified
    if (user.isVerified) {
      res.status(400).json({
        success: false,
        message: "Email is already verified.",
      });
      return;
    }

    // Get OTP from Redis
    const storedOTP = await redisClient.get(`otp:${email}`);

    // OTP expired
    if (!storedOTP) {
      res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new OTP.",
      });
      return;
    }

    // Incorrect OTP
    if (storedOTP !== otp) {
      res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
      return;
    }

    // Mark user as verified
    user.isVerified = true;
    await user.save();

    // Delete OTP from Redis
    await redisClient.del(`otp:${email}`);

    // Generate JWT
    const token = generateToken(user._id.toString());

    res.status(200).json({
      success: true,
      message: "Email verified successfully.",
      token,
      user: {
        id: user._id,
        name: user.name, 
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Email verification error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// LOGIN
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
      return;
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found.",
      });
      return;
    }

    // Check email verification
    if (!user.isVerified) {
      res.status(403).json({
        success: false,
        message: "Please verify your email before logging in.",
      });
      return;
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
      return;
    }

    // Generate JWT
    const token = generateToken(user._id.toString());

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
