"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaEye, FaEyeSlash, FaLeaf, FaLock, FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInputs {
    full_name: string;
    email: string;
    password: string;
    confirm_password: string;
}

const RegisterForm = ({ previousStep }: { previousStep: (step: number) => void }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { register, handleSubmit, watch, formState: { isValid } } = useForm<IFormInputs>({ 
        mode: "onChange"
    });

    const password = watch("password");

    const onSubmit: SubmitHandler<IFormInputs> = (data) => {
        console.log(data);
    };

    return (
        <div className="flex flex-col items-center justify-center px-6 py-10 relative">
            {/* Back button */}
            <p className="flex items-center gap-1 text-green-600 hover:text-green-700 font-bold cursor-pointer absolute top-6 left-6" onClick={() => previousStep(1)}>
                <FaArrowLeft /> Back
            </p>

            {/* Form */}

            <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl font-bold text-green-700 mb-2">
                Create Account
            </motion.h1>

            <p className="text-gray-600 mb-6 flex items-center gap-1">
                Join Grocify today and enjoy fresh products <FaLeaf className="text-green-600" />
            </p>

            <motion.form 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col gap-4 w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
                {/* Full Name Field*/}
                <div className="relative">
                    <FaUser className="text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" />
                    <input
                        {...register("full_name", {required: true})}
                        type="text"
                        id="full_name"
                        placeholder=" "
                        className="peer w-full border border-gray-300 rounded-xl py-3.5 pl-11 pr-4 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                    />
                    <label
                        htmlFor="full_name"
                        className="absolute left-11 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 pointer-events-none
                        peer-focus:top-0 peer-focus:left-4 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-green-600 peer-focus:bg-[#e3fdec] peer-focus:px-2
                        peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:bg-[#e3fdec] peer-[:not(:placeholder-shown)]:px-2"
                    >
                        Full Name
                    </label>
                </div>

                {/* Email Field*/}
                <div className="relative">
                    <IoMdMail className="text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" />
                    <input
                        {...register("email", {required: true})}
                        type="email"
                        id="email"
                        placeholder=" "
                        className="peer w-full border border-gray-300 rounded-xl py-3.5 pl-11 pr-4 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                    />
                    <label
                        htmlFor="email"
                        className="absolute left-11 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 pointer-events-none peer-focus:top-0 peer-focus:left-4 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-green-600 peer-focus:bg-[#e9fef0] peer-focus:px-2 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:bg-[#e9fef0] peer-[:not(:placeholder-shown)]:px-2"
                    >
                        Email
                    </label>
                </div>

                {/* password field  */}
                <div className="relative">
                    <FaLock className="text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" />
                    <input
                        {...register("password", {required: true})}
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder=" "
                        className="peer w-full border border-gray-300 rounded-xl py-3.5 pl-11 pr-4 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                    />
                    {showPassword ? (
                        <FaEye
                            className="text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer hover:text-green-600 transition-all duration-200"
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    ) : (
                        <FaEyeSlash
                            className="text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer hover:text-green-600 transition-all duration-200"
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    )}
                    <label
                        htmlFor="password"
                        className="absolute left-11 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 pointer-events-none peer-focus:top-0 peer-focus:left-4 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-green-600 peer-focus:bg-[#e9fef0] peer-focus:px-2 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:bg-[#e9fef0] peer-[:not(:placeholder-shown)]:px-2"
                    >
                        Password
                    </label>
                </div>

                {/* confirm password field */}
                <div className="relative">
                    <FaLock className="text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" />
                    <input
                        {...register("confirm_password", 
                        {required: true,
                         validate: (value) => value === password || "Passwords do not match"
                        })}
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirm_password"
                        placeholder=" "
                        className="peer w-full border border-gray-300 rounded-xl py-3.5 pl-11 pr-4 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
                    />
                    {showConfirmPassword ? (
                        <FaEye
                            className="text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer hover:text-green-600 transition-all duration-200"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        />
                    ) : (
                        <FaEyeSlash
                            className="text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer hover:text-green-600 transition-all duration-200"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        />
                    )}
                    <label
                        htmlFor="confirm_password"
                        className="absolute left-11 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 pointer-events-none peer-focus:top-0 peer-focus:left-4 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-green-600 peer-focus:bg-[#e9fef0] peer-focus:px-2 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:bg-[#e9fef0] peer-[:not(:placeholder-shown)]:px-2"
                    >
                        Confirm Password
                    </label>
                </div>
                <button disabled={!isValid} type="submit" className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-200
                ${isValid
                        ? "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}>
                    Register
                </button>
            </motion.form>
        </div>
    );
};

export default RegisterForm;
