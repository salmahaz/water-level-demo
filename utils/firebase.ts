import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  // apiKey: "AIzaSyALRY4jbJUHiPU9Zl7ktAe47fyYTNPlFi0",
  // authDomain: "water-monster-service-provider.firebaseapp.com",
  // projectId: "water-monster-service-provider",
  // storageBucket: "water-monster-service-provider.appspot.com",
  // messagingSenderId: "75486011595",
  // appId: "1:75486011595:web:174ce52daed782f18a3b4e",
  apiKey: "AIzaSyDCKoXoHG24JaGzeBZv1G-VYtIYr56GzJE",
  authDomain: "wm-test-services.firebaseapp.com",
  projectId: "wm-test-services",
  storageBucket: "wm-test-services.firebasestorage.app",
  messagingSenderId: "389373548663",
  appId: "1:389373548663:web:4fca180ad7df706f5bce72",
  // measurementId:"G-6PLJ7X6TQE"
};

const firebaseApp = initializeApp(firebaseConfig);

export { firebaseApp };

export const messaging =
  typeof window !== "undefined" ? getMessaging(firebaseApp) : null;
