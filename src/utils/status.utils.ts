import { STATUS_COLORS } from "../config/status.config";

export const getStatusColor= (status: string): string => {
  return STATUS_COLORS[status] || "bg-gray-100 text-gray-700";
};
