import { Document, Types } from "mongoose";
import { Request } from "express";

export interface UserProps extends Document {
  email: string;
  password: string;
  name?: string;
  avatar?: string;
  created?: Date;
}

export interface ConversationProps extends Document {
  _id: Types.ObjectId;
  type: "direct" | "group";
  name?: string;
  participants: Types.ObjectId[];
  lastMesage?: Types.ObjectId;
  craetedBy?: Types.ObjectId;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}