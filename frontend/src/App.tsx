import {useEffect, useState} from "react";
import "./App.css";
import {onAuthStateChanged, User} from "firebase/auth";
import {auth} from "./utils/firebase";
import {AuthPage} from "./pages/AuthPage";
import {GamePage} from "./pages/GamePage.tsx";

function App() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
    }, []);

    if (loading) return <div>Chargement...</div>;

    return user ? (
        <>
            <div className="p-6">
                <h1 className="text-xl mb-4">Bienvenue, {user.email}</h1>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => auth.signOut()}
                >
                    Se déconnecter
                </button>
            </div>
            <GamePage/>
        </>
    ) : (
        <AuthPage/>
    );
}

export default App;
