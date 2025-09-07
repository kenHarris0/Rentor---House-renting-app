const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ success: false, message: "auth failed" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id) {
      return res.status(401).json({ success: false, message: "unauthorized access" });
    }

    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: "invalid token" });
  }
};

module.exports = userAuth;
