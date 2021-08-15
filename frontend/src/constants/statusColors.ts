export function getStatusColor(s: string): string {
  switch (s) {
    case "PLACED":
      return "yellow";
    case "CANCELED":
      return "red";
    case "PROCESSING":
      return "purple";
    case "DELIVERED":
      return "blue";
    case "RECEIVED":
      return "green";
    default:
      return "yellow";
  }
}
