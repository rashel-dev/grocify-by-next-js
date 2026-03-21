"use client";

import { useState } from "react";
import { LuSearch } from "react-icons/lu";

const MobileSearch = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <div className="flex md:hidden items-center relative">
            {!isSearchOpen && (
                <button onClick={() => setIsSearchOpen(true)} className="text-white hover:text-white/80 transition-colors duration-300">
                    <LuSearch className="w-6 h-6" />
                </button>
            )}

            <div
                className={`flex items-center bg-white rounded-full shadow-md overflow-hidden transition-all duration-500 ease-in-out ${
                    isSearchOpen ? "w-48 px-3 py-1.5 opacity-100" : "w-0 px-0 opacity-0"
                }`}
            >
                <LuSearch className="text-gray-500 w-4 h-4 mr-2 shrink-0" />
                <input
                    type="text"
                    placeholder="Search..."
                    autoFocus={isSearchOpen}
                    className="outline-none w-full text-gray-700 text-sm placeholder:text-gray-400 bg-transparent"
                    onBlur={() => setIsSearchOpen(false)}
                />
            </div>
        </div>
    );
};

export default MobileSearch;
