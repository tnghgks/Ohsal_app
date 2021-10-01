export const authCheck = (req, res) => {
  try {
    const { user } = req.session.passport;
    if (user) {
      res.send(user).end();
    } else {
      res.send(401).end();
    }
  } catch (error) {
    console.log(error);
    return;
  }
};
