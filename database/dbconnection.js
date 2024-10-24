import * as dotenv from "dotenv"
dotenv.config({path:'./config/.env'})
import mongoose from "mongoose";
export const dbcon = mongoose
  .connect(process.env.MONGO_URI) // ------------------
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));
// thats how u use .env
// .env store all your secret keys and urls and passwords
// dont upload it to github pls
// to understand how i did it , look at index.js
// dont forget to install dotenv by running npm i dotenv
