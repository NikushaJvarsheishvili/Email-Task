import { object, ref, string } from "yup";

export const loginSchema = object({
  email: string().min(4).required(),
  password: string().required().trim().min(8),
});
