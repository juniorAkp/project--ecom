const verifySession = (req, res, next) => {
  if (req.session && req.session.userId) {
    req.userId = req.session.userId;
    req.isAdmin = req.session.isAdmin;
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized - Session required', success: false });
  }
};

module.exports = verifySession;