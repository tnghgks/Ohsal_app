export const authCheck = (req, res) => {
  if (req.isAuthenticated()) {
    return res.json(req.user);
  }
  return res.send(false);
};

export const logout = (req, res) => {
  req.logout();
  return res.redirect("/");
};
