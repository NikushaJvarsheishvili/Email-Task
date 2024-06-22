export const csfrProtection = (req, res, next) => {
  const csrfToken = req.get("X-Csrf-Token");

  if (csrfToken !== req.session.csrfToken) {
    return res.status(403).send({ message: "Invalid CSRF Token" });
  }
  next();
};
