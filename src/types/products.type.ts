interface IProduct {
    name: string;
    price: number;
    image: string;
    category: string;
    stock: number;
    unit: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default IProduct;