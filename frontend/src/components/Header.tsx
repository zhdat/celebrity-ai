import {Link} from "react-router-dom";

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
            <nav className="flex gap-4 text-white text-sm sm:text-base font-semibold">
                <Link to="/difficulty" className="hover:underline">Jouer</Link>
                <Link to="/leaderboard" className="hover:underline">Classement</Link>
                <Link to="/my-score" className="hover:underline">Mes scores</Link>
            </nav>
        </header>
    )
}