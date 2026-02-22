interface IUser {
    email: string;
    name: string;
    password: string;
    image?: string;
    role: "admin" | "rider" | "user";
    mobile?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default IUser;