// import { getStorage, ref, uploadBytes } from "firebase/storage";
// import { firebaseApp } from "./firebaseInit";

// const storage = getStorage(firebaseApp);

// export async function uploadToFirebase(
//   image: string,
//   path: string,
//   name: string,
// ) {
//   const fileName = `${path}/${name}.png`;
//   const storageRef = ref(storage, fileName);
//   const imageBuffer = Buffer.from(image, "base64");
//   await uploadBytes(storageRef, imageBuffer);

//   const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${
//     process.env.FIREBASE_STORAGEBUCKET
//   }/o/${encodeURIComponent(fileName)}?alt=media`;
//   return imageUrl;
// }
