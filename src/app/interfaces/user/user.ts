export interface User {
    userId: string;
    username: string;
    password: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: string;
    address?: string;
    products?: any;
}
