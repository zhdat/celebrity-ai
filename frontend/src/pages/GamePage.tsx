import {useEffect, useState} from "react";
import data from "../data/images.json"
import {GuessInput} from "@/components/GuessInput.tsx";
import {useLocation} from "react-router-dom";
import {Layout} from "@/components/Layout.tsx";

export const GamePage = () => {
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(30);
    const [done, setDone] = useState(false);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const difficulty = params.get("difficulty") || "easy";

    const filtered = data.filter((img) => img.difficulty === difficulty);
    const current = filtered[index];

    useEffect(() => {
        if (timer == 0) {
            next();
            return;
        }
        const interval = setInterval(() => setTimer((t) => t - 1), 1000);
        return () => clearInterval(interval);
    }, [timer, index]);

    const next = () => {
        if (index + 1 < filtered.length) {
            setIndex(index + 1);
            setTimer(30);
        } else {
            setDone(true);
        }
    }

    const handleGuess = (input: string) => {
        const guess = input.toLowerCase();
        const correct = current.answers.some((a) => guess.includes(a.toLowerCase()));
        if (correct) setScore((s) => s + 1);
        next();
    };


    if (done) {
        return (
            <Layout>
                <div
                    className="min-h-screen flex flex-col items-center justify-center text-center text-xl text-green-600">
                    🎉 Bravo ! Score final : {score} / {filtered.length}
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-screen px-4">
                <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl relative">


                    {/* Barre de progression */}
                    <div className="w-full h-2 bg-gray-200 rounded overflow-hidden my-4">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                            style={{width: `${(index / filtered.length) * 100}%`}}
                        />
                    </div>

                    <div className="flex flex-col items-center mt-6">
                        <img
                            src={current.image_url}
                            alt="Fusion"
                            className="w-72 h-72 object-cover rounded-xl mb-4 border-4 border-yellow-300 shadow-md"
                        />
                        <p
                            className={`mb-2 font-semibold text-lg ${timer > 10
                                ? "text-green-600"
                                : timer > 5
                                    ? "text-yellow-500"
                                    : "text-red-600"}`}
                        >
                            Temps restant : {timer}s
                        </p>
                        <GuessInput onGuess={handleGuess}/>
                        <p className="mt-4 text-base font-semibold text-indigo-600">
                            Score : {score} / {filtered.length}
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}