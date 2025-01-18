const adminOnly = (req, res, next) => {
    if (req.isAdmin) {
        next();
    } else {
        res.status(401).json({ msg: "Admin access only" });
    }
}
module.exports = adminOnly;
