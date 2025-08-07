import { z } from "zod";

export const SignUpFormSchema = z.object({
  name: z.string().min(2, { message: "Insert a valid full name." }).trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  prefix: z.string(),
  password: z
    .string()
    .min(8, { message: "It should be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "It should contain at least one letter." })
    .regex(/[0-9]/, { message: "It should contain at least one number." })
    .trim(),
  phoneNumber: z.string().min(6, { message: "Insert a valid phone number." }),
});

export const LogInFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .trim(),
});
export const EmailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
});

export const PasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "It should be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "It should contain at least one letter." })
    .regex(/[0-9]/, { message: "It should contain at least one number." })
    .trim(),
});



export type FormErrors = Partial<
  Record<keyof z.infer<typeof LogInFormSchema>, string[]>
>;

