export const validateSchema = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (err) {
      return res.status(400).json({
        name: err.name,
        message: err.message,
        errors: err.errors,
      });
    }
  };
};
