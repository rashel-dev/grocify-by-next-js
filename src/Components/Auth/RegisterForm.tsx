"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaEye, FaEyeSlash, FaLeaf, FaLock, FaSpinner, FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiLogIn } from "react-icons/bi";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface IFormInputs {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
}

const RegisterForm = ({ previousStep }: { previousStep: (step: number) => void }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { isValid, errors },
    } = useForm<IFormInputs>({
        mode: "onChange",
    });

    const password = watch("password");

    const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
        try {
            setLoading(true);
            const response = await axios.post("/api/auth/register", {
                name: data.name,
                email: data.email,
                password: data.password,
            });
            toast.success("Account created successfully! 🎉");
            router.push("/");
        } catch (error: any) {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };
    const handleGoogleLogin = async () => {
        try {
            setGoogleLoading(true);
            await signIn("google", {
                redirect: true,
                callbackUrl: "/",
            });
        } catch (error) {
            toast.error("Google login failed");
            setGoogleLoading(false);
        }
    };
    return (
        <div className="flex flex-col items-center justify-center px-6 py-10 relative">
            {/* Back button */}
            <button type="button" className="flex items-center gap-1 text-green-600 hover:text-green-700 font-bold cursor-pointer absolute top-6 left-6" onClick={() => previousStep(1)}>
                <FaArrowLeft /> Back
            </button>

            {/* Form */}

            <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-3xl sm:text-4xl font-bold text-green-700 mb-2">
                Create Account
            </motion.h1>

            <p className="text-gray-600 mb-6 flex items-center gap-1">
                Join Grocify today and enjoy fresh products <FaLeaf className="text-green-600" />
            </p>

            <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className={`flex flex-col gap-3 w-full max-w-sm ${loading ? "pointer-events-none opacity-80" : ""}`}
                onSubmit={handleSubmit(onSubmit)}
            >
                {/* Full Name Field*/}
                <div>
                    <div className="relative">
                        <FaUser className="text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" />
                        <input
                            autoComplete="name"
                            {...register("name", {
                                required: "Name is required",
                                minLength: {
                                    value: 3,
                                    message: "Name must be at least 3 characters long",
                                },
                                pattern: {
                                    value: /^[A-Za-z\s]+$/,
                                    message: "Name can only contain letters and spaces",
                                },
                            })}
                            type="text"
                            id="name"
                            placeholder=" "
                            className={`peer w-full border rounded-xl py-3.5 pl-11 pr-4 focus:ring-2 focus:outline-none ${errors.name ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : "border-gray-300 focus:border-green-500 focus:ring-green-500/20"}`}
                        />
                        <label
                            htmlFor="name"
                            className="absolute left-11 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 pointer-events-none
                            peer-focus:top-0 peer-focus:left-4 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-green-600 peer-focus:bg-[#e3fdec] peer-focus:px-2
                            peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:bg-[#e3fdec] peer-[:not(:placeholder-shown)]:px-2"
                        >
                            Full Name
                        </label>
                    </div>
                    {errors?.name && <p className="text-red-500 text-xs ml-4">{errors.name.message}</p>}
                </div>

                {/* Email Field*/}
                <div>
                    <div className="relative">
                        <IoMdMail className="text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" />
                        <input
                            autoComplete="email"
                            {...register("email", { required: "Email is required", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" } })}
                            type="email"
                            id="email"
                            placeholder=" "
                            className={`peer w-full border rounded-xl py-3.5 pl-11 pr-4 focus:ring-2 focus:outline-none ${errors.email ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : "border-gray-300 focus:border-green-500 focus:ring-green-500/20"}`}
                        />
                        <label
                            htmlFor="email"
                            className="absolute left-11 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 pointer-events-none peer-focus:top-0 peer-focus:left-4 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-green-600 peer-focus:bg-[#e9fef0] peer-focus:px-2 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:bg-[#e9fef0] peer-[:not(:placeholder-shown)]:px-2"
                        >
                            Email
                        </label>
                    </div>
                    {errors?.email && <p className="text-red-500 text-xs ml-4">{errors.email.message}</p>}
                </div>

                {/* password field  */}
                <div>
                    <div className="relative">
                        <FaLock className="text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" />
                        <input
                            autoComplete="new-password"
                            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" } })}
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder=" "
                            className={`peer w-full border rounded-xl py-3.5 pl-11 pr-4 focus:ring-2 focus:outline-none ${errors.password ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : "border-gray-300 focus:border-green-500 focus:ring-green-500/20"}`}
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
                    {errors?.password && <p className="text-red-500 text-xs ml-4">{errors.password.message}</p>}
                </div>

                {/* confirm password field */}
                <div>
                    <div className="relative">
                        <FaLock className="text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" />
                        <input
                            autoComplete="new-password"
                            {...register("confirm_password", { required: "Confirm Password is required", validate: (value) => value === password || "Password do not match" })}
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirm_password"
                            placeholder=" "
                            className={`peer w-full border rounded-xl py-3.5 pl-11 pr-4 focus:ring-2 focus:outline-none ${errors.confirm_password ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : "border-gray-300 focus:border-green-500 focus:ring-green-500/20"}`}
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
                    {errors?.confirm_password && <p className="text-red-500 text-xs ml-4">{errors.confirm_password.message}</p>}
                </div>

                {/* submit button */}
                <button
                    disabled={!isValid || loading}
                    type="submit"
                    className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${isValid && !loading ? "bg-green-600 text-white hover:bg-green-700 cursor-pointer" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                >
                    {loading ? (
                        <>
                            <FaSpinner className="animate-spin w-5 h-5" />
                            Registering...
                        </>
                    ) : (
                        "Register"
                    )}
                </button>
            </motion.form>

            {/* devider  */}
            <div className="flex items-center gap-4 w-full max-w-sm my-2 text-gray-400 font-semibold">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span>OR</span>
                <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Google sign in button */}
            <button
                disabled={googleLoading || loading}
                type="button"
                className="flex items-center justify-center gap-2 max-w-sm w-full py-3.5 border border-gray-300 rounded-xl font-semibold bg-white text-gray-500 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                onClick={handleGoogleLogin}
            >
                {googleLoading ? (
                    <>
                        <FaSpinner className="animate-spin" />
                        Redirecting...
                    </>
                ) : (
                    <>
                        <FcGoogle className="w-5 h-5" />
                        Sign up with Google
                    </>
                )}
            </button>

            <p className="flex items-center gap-1 text-gray-600 mt-4 text-sm">
                Already have an account?
                <Link href="/login" className="flex items-center gap-1 hover:text-green-700 transition-all duration-200 text-green-600 cursor-pointer font-semibold">
                    <BiLogIn /> Sign In
                </Link>
            </p>
        </div>
    );
};

export default RegisterForm;
