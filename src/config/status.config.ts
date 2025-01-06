export const STATUS_CONFIG: Record<string, { color: string; label: string }> = {
  accepted: { color: "bg-green-100 text-green-800", label: "Acceptée" },
  rejected: { color: "bg-red-100 text-red-800", label: "Rejetée" },
  pending: { color: "bg-yellow-100 text-yellow-800", label: "En attente" },
  shipped: { color: "bg-blue-100 text-blue-700", label: "Expédiée" },
  delivered: { color: "bg-purple-100 text-purple-700", label: "Livrée" },
  canceled: { color: "bg-red-100 text-red-700", label: "Annulée" },
};
