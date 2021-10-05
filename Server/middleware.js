export const loginCheck = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.json({ message: "이미 로그인한 상태입니다." });
  }
  return next();
};
