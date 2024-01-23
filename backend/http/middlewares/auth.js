function AuthorizeRequest(req,res,next) {
    if(!req.isAuthenticated()) {
        return res.json({
            status: "error",
            message: "You are not authorized! Please login or register"
        });
    }
    return next();
}
module.exports = AuthorizeRequest;