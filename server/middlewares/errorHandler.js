const errorHandler = (err, req, res, next) => {

    console.log(err);
    if(res.status(404)){
        return res.status(404).json({
            success: false,
            message: "Page Not found"
        });
    }
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            success: false,
            message: "Token expired"
        });
    }
    if (err.name === 'UserExistsError') {
        return res.status(400).json({
            success: false,
            message: "User already exists"
        });
    }

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            message: "Invalid ID format"
        });
    }
    return res.status(500).json({
        success: false,
        message: "An unexpected error occurred"
        });
};

module.exports = errorHandler;
