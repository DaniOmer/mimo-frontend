export interface IProductImage {
    _id: string;
    product_id: string;
    url: string;
    isPrimary?: boolean;
    altText?: string;
    resolution?: string;
    type?: string;
    order?: number;
    createdAt: string;
    updatedAt: string;
}