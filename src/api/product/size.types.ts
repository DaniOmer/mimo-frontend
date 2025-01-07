
export interface ISize {
    _id: string;
    name: string; 
    dimensions: string; 
    volume?: number | null; 
    weightCapacity?: number | null; 
    isPopular?: boolean; 
    createdAt: string;
    updatedAt: string;
}