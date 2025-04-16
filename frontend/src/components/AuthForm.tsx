import {useState} from "react";
import {auth} from "../utils/firebase.ts";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {useNavigate} from "react-router-dom";

export const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }

            navigate("/difficulty");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred.");
            }
        }
    };

    return (
        <div className="max-w-sm mx-auto mt-20 p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">{isLogin ? "Connexion" : "Inscription"}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2 border rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 border rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                    {isLogin ? "Se connecter" : "S'inscrire"}
                </button>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <p onClick={() => setIsLogin(!isLogin)} className="text-blue-500 cursor-pointer text-sm">
                    {isLogin ? "Pas encore de compte ? S'inscrire" : "Déjà inscrit ? Se connecter"}
                </p>
            </form>
        </div>
    );
};
