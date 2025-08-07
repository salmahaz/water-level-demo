// import nodemailer from "nodemailer";

// export async function sendResetEmail(to: string, token: string) {
//   // create transporter
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   // compose email
//   const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to,
//     subject: "Reset your password",
//     html: `
//       <p>Hi,</p>
//       <p>You requested a password reset. Click the link below to reset your password:</p>
//       <a href="${resetUrl}">${resetUrl}</a>
//     `,
//   };

//   // send email
//   try {
//     const info = await transporter.sendMail(mailOptions);
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw new Error("Failed to send reset email");
//   }
// }
