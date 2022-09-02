import { Comment } from '../comment/comment';

export interface Product {
    name: string;
    desc: string;
    rating: number;
    price: number;
    className: string;
    image: string;
    quantity: number;
    shippingDays: number;
    category: string;
    country: string;
    manuf: string;
    manufWeb: string;
    vendor?: string;
    productCode: string,
    comments?: Array<Comment>;
}
