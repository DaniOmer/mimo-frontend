export interface ISize {
  _id: string;
  name: string;
  dimensions: string;
  volume?: number;
  weightCapacity?: number;
  isPopular?: boolean;
  createdAt: Date;
  updatedAt: Date;
}