export interface ICategory  {
    _id: string;
    name: string; 
    description?: string; 
    parentId?: string;
    createdAt: string;
    updatedAt: string;
    productCount: number;
}