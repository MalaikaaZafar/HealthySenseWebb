const auth = async (req, res, next) => {
    if (!req.user.type === "Patient")
        return res.status(404).json({ message: "Wrong User" });

    next();
};

module.exports = auth;