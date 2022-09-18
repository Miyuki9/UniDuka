module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    console.log(req.user);
    return res.redirect("/login");
  }
  next();
};
