import User from "../../database/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError.js";
import { errorCodes } from "../utils/error-codes.js";

const checkSignupEmail = async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });

  if (user)
    return next(
      new AppError(errorCodes.Email_Exits.message, errorCodes.Email_Exits.code) // ----------------------
    );
  else {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    return next();
  }
};
const checkSigninEmail = async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });

  let match = bcrypt.compareSync(req.body.password, user.password);

  if (!user || !match)
    return next(new AppError("email or password incorrect", 401)); // do the same as i did above pls

  jwt.sign(
    { userId: user._id, name: user.name, email: user.email, role: user.role },
    "abdomohsen",
    (err, token) => {
      if (err) return next(new AppError(err.message, 401));
      req.token = token;
      return next();
    }
  );
};

export { checkSignupEmail, checkSigninEmail };
