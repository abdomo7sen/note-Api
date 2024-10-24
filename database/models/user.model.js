import { Schema, model } from "mongoose";

export const USER_COLLECTON_NAME = "User"; 

let schema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

let User = model(USER_COLLECTON_NAME, schema); 

export default User;
