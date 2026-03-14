import IUser from "@/types/user.type";
import { model, models, Schema } from "mongoose";

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true  
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: false,
        minLength: 6
    },
    image: {
        type: String
    },
    mobile: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "rider", "admin"],
        default: "user"
    }

},{
    timestamps: true
})

const User = models.User || model<IUser>("User", userSchema);

export default User