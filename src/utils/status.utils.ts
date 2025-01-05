import { STATUS_CONFIG } from "../config/status.config";

export const getStatusDetails = (status: string): { color: string; label: string } => {
  return STATUS_CONFIG[status] || { color: "bg-gray-100 text-gray-700", label: "Inconnu" };
};
