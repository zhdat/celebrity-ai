import {useEffect, useState} from "react";
import data from "../utils/images.json"

export const GamePage = () => {
    const [index, setIndex] = useState(0);
    const [input, setInput] = useState('');
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(30);
    const [done, setDone] = useState(false);

    const current = data[index];

    useEffect(() => {
        if (timer == 0) return;
        const interval = setInterval(() => setTimer((t) => t - 1), 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const handleSubmit = () => {
        const guess = input.trim().toLowerCase();
        const correct = current.answers.some((a) => guess.includes(a.toLowerCase()));
        if (correct) setScore((s) => s + 1);
        next();
    }

    const next = () => {
        if (index + 1 < data.length) {
            setIndex(index + 1);
            setInput("");
            setTimer(30);
        } else {
            setDone(true);
        }
    }

    if (done) {
        return <div className="text-center mt-10">🎉 Score final : {score}</div>
    }

    return (
        <div className="flex flex-col items-center mt-10">
            <img src={current.url} alt="Fusion" className="w-80 h-80 object-cover rounded-xl mb-4"/>
            <p className="mb-2">Temps restant : {timer}s</p>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Devine qui c'est ..."
                   className="p-2 border rounded w-64 mb-2"/>
            <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">Valider</button>
            <p className="mt-4 text-sm">Score : {score}</p>
        </div>
    )
}