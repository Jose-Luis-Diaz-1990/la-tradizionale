export interface ApiCustomerOrder {
    _id: string,
    order: string,
    name: string,
    surname: string,
    email: string,
    phoneNumber: number,
    shippingAddress: string,
    store: string,
    createdAt?: string;
    updatedAt?: string; 
}