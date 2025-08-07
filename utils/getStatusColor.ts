export const getStatusColor = (status?: string) => {
  switch (status) {
    case "done":
      return "border-primary";
    case "pending":
      return "border-medium_gray";
    case "new":
      return "border-secondary";
    default:
      return "border-medium_gray";
  }
};
