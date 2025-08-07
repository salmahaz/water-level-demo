export interface SendOrderDT {
  orderId?: string;
  name: string;
  phoneNumber: string;
  address: string;
  url: string;
}
export default function sendOrder({
  name,
  phoneNumber,
  address,
  url,
}: SendOrderDT) {
  let message = ``;

  message += `Name: ${name}\n`;
  message += `Phone Number:${phoneNumber}\n`;
  message += `Address: ${address}\n`;
  message += `Order Link: ${url}`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/96181705494?text=${encodedMessage}`;
  window.open(whatsappURL, "_blank");
}
