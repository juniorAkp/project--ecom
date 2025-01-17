const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config();

const verify = async (req, res, next) => {
  const token = req.cookies.token;
  const token2 = req.cookies.token2;

  console.log("Token 1:", token);  // Debugging - check token1
  console.log("Token 2:", token2); // Debugging - check token2

  if (!token || !token2) {
    return res.status(401).json({ message: "Unauthorized - Both tokens required", success: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token 1:", decoded); // Debugging - check decoded token1

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid token", success: false });
    }

    req.userId = decoded.userId;
    req.user = decoded.isAdmin;

    const decoded1 = jwt.verify(token2, process.env.JWT_SECRET);
    console.log("Decoded Token 2:", decoded1); // Debugging - check decoded token2

    if (!decoded1) {
      return res.status(401).json({ message: "Unauthorized - Invalid token", success: false });
    }

    req.additionalUserId = decoded1.userId;
    req.additionalUser = decoded1.isAdmin;

    next();
  } catch (error) {
    console.error("Error verifying token:", error.message);  // Log error details
    return res.status(500).json({ message: error.message, success: false });
  }
};


module.exports = verify;
