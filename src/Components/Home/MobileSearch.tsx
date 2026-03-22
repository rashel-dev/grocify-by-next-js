"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { LuSearch, LuX } from "react-icons/lu";

const MobileSearch = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <>
            <div className="bg-white rounded-full w-11 h-11 flex justify-center items-center shadow-md hover:scale-105 transition-all duration-300 cursor-pointer md:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                <LuSearch className="text-green-600 w-6 h-6" />
            </div>

            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y:-10, scale: 0.95 }}
                        animate={{ opacity: 1, y:0, scale: 1 }}
                        exit={{ opacity: 0, y:-10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] bg-white z-50 flex justify-center items-center rounded-full shadow-lg px-4 py-2">
                            <LuSearch className="text-gray-500 w-5 h-5 mr-2" />
                            <input type="text" placeholder="Search products..." className="outline-none w-full text-gray-700 placeholder:text-gray-400" />
                            <button onClick={() => setIsSearchOpen(false)} className="text-gray-500 w-5 h-5 mr-2 cursor-pointer">
                                <LuX />
                            </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default MobileSearch;
