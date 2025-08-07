// import bcrypt from "bcrypt";
// const saltRounds = 10;

// export const hashPassword = (plainText: any) => {
//   return new Promise((resolve, reject) => {
//     bcrypt.hash(plainText, saltRounds, (err: any, hash: any) => {
//       if (err) return reject(err);
//       return resolve(hash);
//     });
//   });
// };

// export const comparePassword = (plainText: any, hash: any) => {
//   return new Promise((resolve, reject) => {
//     bcrypt.compare(plainText, hash, (err: any, result: any) => {
//       if (err) return reject(err);
//       return resolve(result);
//     });
//   });
// };
