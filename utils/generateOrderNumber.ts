export default function generateOrderNumber() {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2); // Get last two digits of the year
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Pad month with leading zero
  const day = String(now.getDate()).padStart(2, "0"); // Pad day with leading zero
  const hour = String(now.getHours()).padStart(2, "0"); // Pad hour with leading zero
  const minute = String(now.getMinutes()).padStart(2, "0"); // Pad minute with leading zero
  const second = String(now.getSeconds()).padStart(2, "0"); // Pad second with leading zero

  // You can optionally add a random component for additional uniqueness:
  const randomSuffix = Math.floor(Math.random() * 100)
    .toString()
    .padStart(2, "0");

  return `RC${year}${month}${day}${hour}${minute}${second}${randomSuffix}`;
}
