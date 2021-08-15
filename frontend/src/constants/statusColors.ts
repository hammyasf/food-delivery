export function getStatusColor(s: string): string {
  s = s.toUpperCase();
  switch (s) {
    case "PLACED":
      return "yellow";
    case "CANCELED":
      return "red";
    case "PROCESSING":
      return "purple";
    case "IN_ROUTE":
      return "cyan";
    case "DELIVERED":
      return "blue";
    case "RECEIVED":
      return "green";
    default:
      return "yellow";
  }
}

export function getNextStatus(s: string): string {
  switch (s) {
    case "PLACED":
      return "Processing";
    case "CANCELED":
      return "Canceled";
    case "PROCESSING":
      return "In_Route";
    case "IN_ROUTE":
      return "Delivered";
    case "DELIVERED":
      return "Received";
    case "RECEIVED":
      return "Received";
    default:
      return "Placed";
  }
}
