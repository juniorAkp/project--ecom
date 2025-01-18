const adminOnly = (req, res, next) => {
    if (req.user || req.additionalUserId) {
        next();
    } else {
        res.status(401).json({ msg: "Admin access only" });
    }
}
module.exports = adminOnly;