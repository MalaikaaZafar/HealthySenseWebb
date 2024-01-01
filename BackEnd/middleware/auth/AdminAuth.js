const auth = async (req, res, next) => {
  if (!req.user.type === "Admin")
      return res.status(404).json({ message: "Wrong User" });

  next();
};

module.exports = auth;