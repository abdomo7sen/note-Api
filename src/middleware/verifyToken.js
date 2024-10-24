import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const { token } = req.headers;
  jwt.verify(token, "abdomohsen", async (err, decoded) => {
    if (err) return res.status(403).json({ message: "token is not valid" }); // look at how i use errorCodes - look at utils file
    req.user = decoded;
    next();
  });
};
