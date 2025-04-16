import {Link} from "react-router-dom";
import {auth} from "@/utils/firebase.ts";

export const Header = () => {
    return (
        <header
            className="bg-gradient-to-r from-pink-500 via-red-400 to-yellow-400 shadow-md px-6 py-4 flex items-center justify-between fixed top-0 left-0 w-full z-50">
            <Link
                to="/"
                className="relative text-white text-2xl sm:text-3xl font-extrabold tracking-wide drop-shadow-md shine"
            >
                🎭 Celebrity Fusion
            </Link>
            <button
                onClick={() => auth.signOut()}
                className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-3 py-1 rounded-full text-sm shadow hover:scale-105 transition-transform"
            >
                Déconnexion
            </button>
        </header>
    )
}