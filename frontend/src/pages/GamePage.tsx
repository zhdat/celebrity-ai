import {useEffect, useState} from "react";
import data from "../data/images.json"
import {GuessInput} from "@/components/GuessInput.tsx";
import {auth} from "@/utils/firebase.ts";

export const GamePage = () => {
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(30);
    const [done, setDone] = useState(false);

    const current = data[index];

    useEffect(() => {
        if (timer == 0) return;
        const interval = setInterval(() => setTimer((t) => t - 1), 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const next = () => {
        if (index + 1 < data.length) {
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
        return <div className="text-center mt-10">🎉 Score final : {score}</div>
    }

    return (
        <>
            <button
                onClick={() => auth.signOut()}
                className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
            >
                Déconnexion
            </button>

            <div className="flex flex-col items-center mt-10">
                <img src={current.image_url} alt="Fusion" className="w-80 h-80 object-cover rounded-xl mb-4"/>
                <p className="mb-2">Temps restant : {timer}s</p>
                <GuessInput onGuess={handleGuess}/>
                <p className="mt-4 text-sm">Score : {score}</p>
            </div>
        </>
    )
}