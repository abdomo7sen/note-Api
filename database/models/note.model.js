import { Schema, Types, model } from "mongoose";
import { USER_COLLECTON_NAME } from "./user.model.js";

export const NOTE_COLLECTON_NAME = "Note";
let schema = new Schema(
  {
    title: String,
    desc: String,

    createdBy: {
      type: Types.ObjectId,
      ref: USER_COLLECTON_NAME, 
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

let Note = model(NOTE_COLLECTON_NAME, schema); 

export default Note;
