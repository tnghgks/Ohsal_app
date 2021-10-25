export const authCheck = (req, res) => {
  if (req.isAuthenticated()) {
    return res.json(req.user);
  }
  return res.send(false);
};

export const logout = (req, res) => {
  if (req.isAuthenticated()) {
    req.logout();
    req.session.save(() => {
      res.send(false);
    });
  } else {
    res.send(false);
  }
};
