"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaLeaf, FaLock, FaSpinner } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiLogIn } from "react-icons/bi";
import toast from "react-hot-toast";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface IFormInputs {
    email: string;
    password: string;
}

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { isValid, errors },
    } = useForm<IFormInputs>({
        mode: "onChange",
    });

    // Email and password login handler
    const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
        try{
            setLoading(true);
            const result = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false
            })
            
            if (result?.error) {
                toast.error("Invalid email or password");
            } else {
                toast.success("Login successful");
                
                setTimeout(() => {
                    router.replace("/");
                }, 1000);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong"); // It is for network/server error
        } finally {
            setLoading(false);
        }
    };

    // Google login handler
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

            {/* Form */}

            <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-3xl sm:text-4xl font-bold text-green-700 mb-2">
                Welcome Back
            </motion.h1>

            <p className="text-gray-600 mb-6 flex items-center gap-1">
                Sign in for explore fresh products
                <FaLeaf className="text-green-600" />
            </p>

            <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className={`flex flex-col gap-3 w-full max-w-sm ${loading ? "pointer-events-none opacity-80" : ""}`} onSubmit={handleSubmit(onSubmit)}>

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
                            autoComplete="current-password"
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

                {/* submit button */}
                <button
                    disabled={!isValid || loading}
                    type="submit"
                    className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${isValid && !loading ? "bg-green-600 text-white hover:bg-green-700 cursor-pointer" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                >
                    {loading ? (
                        <>
                            <FaSpinner className="animate-spin w-5 h-5" />
                            Signing in...
                        </>
                    ) : (
                        "Sign In"
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
                        <FaSpinner className="animate-spin w-5 h-5" />
                        Signing in...
                    </>
                ) : (
                    <>
                        <FcGoogle className="w-5 h-5" />
                        Sign in with Google
                    </>
                )}
            </button>

            <p className="flex items-center gap-1 text-gray-600 mt-4 text-sm">
                Don't have an account?
                <Link href="/register" className="flex items-center gap-1 hover:text-green-700 transition-all duration-200 text-green-600 cursor-pointer font-semibold">
                    <BiLogIn /> Register
                </Link>
            </p>
        </div>
    );
};

export default LoginPage;
