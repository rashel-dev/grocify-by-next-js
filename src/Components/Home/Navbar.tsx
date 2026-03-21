import { User } from 'next-auth';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import { LuSearch } from 'react-icons/lu';
import ProfileSection from './ProfileSection';
import MobileSearch from './MobileSearch';

const Navbar = ({user}: {user: User}) => {

    const plainUser = JSON.parse(JSON.stringify(user));
    
    return (
        <div className="w-[95%] fixed top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-green-500 to-green-700 rounded-2xl shadow-lg shadow-black/30 flex justify-between items-center h-16 px-4 md:px-8 z-50">
            <Link href={"/"} className="text-white font-bold text-2xl tracking-wide hover:text-white/80 transition-colors duration-300">
                Grocify
            </Link>

            <form className="hidden md:flex items-center bg-white rounded-full px-4 py-2 w-1/2 max-w-lg shadow-md">
                <LuSearch className="text-gray-500 w-5 h-5 mr-2" />
                <input type="text" placeholder="Search products..." className="outline-none w-full text-gray-700 placeholder:text-gray-400" />
            </form>

            <div className="flex items-center gap-3 md:gap-6 relative">
                {/* Mobile search component*/}
                <MobileSearch />

                {/* Cart icon */}
                <Link href={"/cart"}>
                    <div className="relative">
                        <FaShoppingCart className="text-white w-6 h-6 hover:text-white/80 transition-colors duration-300" />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
                    </div>
                </Link>

                <ProfileSection user={plainUser} />
            </div>
        </div>
    );
};

export default Navbar;