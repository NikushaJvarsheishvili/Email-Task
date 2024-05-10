import { object, ref, string } from "yup";

export const registerSchema = object({
  email: string().min(4).required(),
  password: string().required().trim().min(8),
});
