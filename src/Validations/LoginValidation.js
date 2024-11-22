import { z } from "zod";

const LoginSchema = z
  .object({
    email: z.string().email().min(5).max(255),
    password: z
      .string()
      .min(8)
      .max(255)
      ,
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.confirmPassword !== data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords must match",
        path: ["confirmPassword"], // Points the error to the confirmPassword field
      });
    }
  });

export default LoginSchema;