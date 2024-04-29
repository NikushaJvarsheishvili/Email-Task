export const statusController = async (req, res) => {
  return res.json({ user: req.user });
};
