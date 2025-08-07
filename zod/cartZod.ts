// import { z } from "zod";
// import { parsePhoneNumberFromString } from "libphonenumber-js";

// // Helper function for phone number validation
// export const validatePhoneNumber = (prefix: string, phoneNumber: string) => {
//   try {
//     const fullPhoneNumber = `${prefix}${phoneNumber.replace(/\s+/g, "")}`;
//     const parsed = parsePhoneNumberFromString(fullPhoneNumber);

//     return parsed?.isValid() || false;
//   } catch {
//     return false;
//   }
// };

// // user cart schema
// export const userCartSchema = z
//   .object({
//     name: z.string().min(1, "Name is required."),
//     prefix: z.string().regex(/^\+\d+$/, "Invalid country code format."),
//     phoneNumber: z.string().min(1, "Phone number is required."),
//   })
//   .refine((data) => validatePhoneNumber(data.prefix, data.phoneNumber), {
//     message: "Invalid phone number format for the given country.",
//     path: ["phoneNumber"], // Attach error to phoneNumber field
//   });

// // structure of an order schema
// export const orderSchema = z.object({
//   number: z.string().min(1, "Order number is required."),
//   totalAmount: z
//     .number()
//     .min(0, "Total amount must be non-negative.")
//     .refine((value) => value > 0, "Total amount must be greater than zero."),
//   offeredTotal: z.number().min(0, "Offered total must be non-negative."),
//   address: z.string().optional(), // Address is optional
//   items: z
//     .array(
//       z.object({
//         productId: z.string().min(1, "Product ID is required."),
//         name: z.string().min(1, "Product name is required."),
//         value: z.string().optional(), // Value can be empty or undefined
//         price: z.number().min(0, "Item price must be non-negative."),
//         offeredPrice: z
//           .number()
//           .min(0, "Offered price must be non-negative.")
//           .optional(), // Offered price is optional
//         imageUrl: z.string().url("Image URL must be a valid URL.").optional(), // Image URL is optional
//         quantity: z.number().min(1, "Item quantity must be at least 1."),
//       }),
//     )
//     .nonempty("Order must contain at least one item."),
//   userId: z
//     .instanceof(Object) // Checks for MongoDB ObjectId
//     .refine(
//       (obj) => obj.toString().length === 24,
//       "User ID must be a valid ObjectId.",
//     ),
//   createdAt: z
//     .date()
//     .refine((date) => date <= new Date(), "Invalid creation date."),
//   updatedAt: z
//     .date()
//     .refine((date) => date <= new Date(), "Invalid update date."),
// });
