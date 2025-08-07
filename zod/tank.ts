import { z } from "zod";

export const TankSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    size: z
      .number()
      .positive("Size must be a positive number")
      .min(100, "Size should be more than 100 Liters")
      .max(100000, "Size should be less than 100000 Liters")
      .refine((val) => !val.toString().startsWith("0"), {
        message: "Size cannot start with 0",
      }),
    height: z
      .number()
      .positive("Height must be a positive number")
      .min(10, "Height should be more than 10 cm")
      .max(400, "Height should be less than 400 cm")
      .refine((val) => !val.toString().startsWith("0"), {
        message: "Height cannot start with 0",
      }),
    x: z.number().min(0, "X should be at least 0 cm"),
    z: z.number().min(0, "Z should be at least 0 cm"),
  })
  .refine((data) => data.x <= data.height / 2, {
    path: ["x"],
    message: "X should not be greater than half of the height",
  })
  .refine((data) => data.z <= data.height / 2, {
    path: ["z"],
    message: "Z should not be greater than half of the height",
  });
