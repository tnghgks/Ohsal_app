export const authCheck = (req, res) => {
  try {
    const { user } = req.session.passport;
    if (user) {
      res.send(200).end();
    } else {
      res.send(401).end();
    }
  } catch (error) {
    console.log(error);
  }
};
