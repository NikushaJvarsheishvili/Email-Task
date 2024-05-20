import { object, ref, string } from "yup";

export const registerSchema = object({
  email: string()
    .min(4)
    .required()
    .matches(/^\S+@\S+\.\S+$/),
  password: string().required().trim().min(8),
  confirmPassword: string()
    .required()
    .oneOf([ref("password"), null], "Passwords must match"),
});
