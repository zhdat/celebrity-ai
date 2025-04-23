import {useNavigate} from "react-router-dom";
import {Layout} from "@/components/Layout.tsx";

export const DifficultyPage = () => {
    const navigate = useNavigate();

    const handleSelect = (level: string) => {
        navigate(`/game?difficulty=${level}`);
    }

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-4">
                <h1 className="text-3xl font-bold mb-6">Choisis ta difficulté</h1>
                <div className="space-y-4">
                    <button onClick={() => handleSelect("easy")}
                            className="text-white mx-4 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform bg-green-500">
                        Facile
                    </button>
                    <button onClick={() => handleSelect("medium")}
                            className="text-white mx-4 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform bg-yellow-500">
                        Moyen
                    </button>
                    <button onClick={() => handleSelect("hard")}
                            className="text-white mx-4 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform bg-red-500">
                        Difficile
                    </button>
                </div>
            </div>
        </Layout>
    );
}