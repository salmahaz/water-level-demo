export const toUpperCase = (serial: string) => {
    return serial
      .split(":")
      .map((part) => part.toUpperCase())
      .join(":");
  };