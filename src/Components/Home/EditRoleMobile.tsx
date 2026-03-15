"use client";
import React from "react";
import { motion } from "framer-motion";
import { RoleMobileInput, roleMobileSchema } from "@/schemas/roleMobileSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const EditRoleMobile = () => {

    const router = useRouter();

    // roles collection
    const roles = [
        {
            name: "User",
            icon: "👤",
            description: "I am a customer",
            value: "user",
        },
        {
            name: "Rider",
            icon: "🛵",
            description: "I am a delivery person",
            value: "rider",
        },
        {
            name: "Admin",
            icon: "👑",
            description: "I am an administrator",
            value: "admin",
        },
    ] as const;

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { isValid, errors, isSubmitting },
    } = useForm<RoleMobileInput>({
        resolver: zodResolver(roleMobileSchema),
        mode: "onChange",
    });

    const selectedRole = watch("role");

    const onSubmit: SubmitHandler<RoleMobileInput> = async (data) => {
        try {
            const response = await axios.post("/api/user/edit-role-mobile",data);
            if(response.status === 200) {
                toast.success(response.data.message);
                router.refresh();
            }
        } catch (error: any) {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong");
            }
        }
    };

    return (
        <div className="flex flex-col justify-center items-center w-full min-h-screen">
            <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-2xl md:text-3xl font-bold text-green-700 text-center">
                Select Your Role
            </motion.h1>
            <p className="text-center text-gray-600 my-2">We need to know your role to serve you better</p>

            {/* roles container cards */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                {roles.map((item) => (
                    <motion.div
                        onClick={() => {
                            setValue("role", item.value, { shouldValidate: true });
                        }}
                        key={item.value}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.1, delay: 0.5 }}
                        className={`flex flex-col justify-center items-center border-2 p-4 rounded-xl w-full md:w-max transition-all duration-300 cursor-pointer ${
                            selectedRole === item.value ? "border-green-600 bg-green-100 shadow-lg scale-105" : "border-gray-300 hover:border-green-300 hover:shadow-md"
                        }`}
                    >
                        <p>{item.icon}</p>
                        <h2 className="text-green-700 font-bold">{item.name}</h2>
                        <p className="text-gray-600">{item.description}</p>
                    </motion.div>
                ))}
            </div>

            {/* mobile number input */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.1, delay: 0.5 }} className="flex flex-col items-center mt-6">
                {/* hidden role input */}
                <input type="hidden" {...register("role")} />

                <label htmlFor="mobile" className="text-gray-700 font-medium mb-2">
                    Enter Your Mobile Number
                </label>
                <input
                    {...register("mobile")}
                    type="tel"
                    id="mobile"
                    placeholder="Enter your mobile number"
                    className="border-2 border-gray-300 rounded-xl px-4 py-2 w-64 md:w-80 focus:outline-none focus:border-green-600 text-gray-800"
                />
            </motion.div>

            {/* error message */}
            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}

            {/* continue button */}
            <motion.button
                onClick={handleSubmit(onSubmit)}
                disabled={!isValid || isSubmitting}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.1, delay: 0.5 }}
                className={` text-white px-4 py-2 rounded-xl mt-6 cursor-pointer transition-all duration-300 ${!isValid || isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
            >
                {isSubmitting ? "Continue..." : "Continue"}
            </motion.button>
        </div>
    );
};

export default EditRoleMobile;
