const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config();

const verify = async (req, res, next) => {
  const token = req.cookies.token;
  const token2 = req.cookies.token2;

  console.log("Token 1:", token);  // Debugging - check token1

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - token required", success: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Debugging - check decoded token1
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid token", success: false });
    }

    req.userId = decoded.userId;
    req.user = decoded.isAdmin;

    next();
  } catch (error) {
    console.error("Error verifying token:", error.message);  // Log error details
    return res.status(500).json({ message: error.message, success: false });
  }
};


module.exports = verify;
