import {useEffect, useMemo, useRef, useState} from "react";
import Fuse from "fuse.js";
import {CELEBRITIES} from "@/data/celebrities.ts";

export const GuessInput = ({onGuess}: { onGuess: (guess: string) => void }) => {
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);

    const fuse = useMemo(() => new Fuse(CELEBRITIES, {
        threshold: 0.3,
        keys: [],
    }), []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);
        if (value.length > 1) {
            const results = fuse.search(value).slice(0, 5).map((r) => r.item);
            setSuggestions(results);
            setSelectedIndex(-1);
        } else {
            setSuggestions([]);
            setSelectedIndex(-1)
        }
    };

    const handleSelect = (value: string) => {
        setInput(value);
        setSuggestions([]);
        setSelectedIndex(-1);
    };

    const handleSubmit = () => {
        onGuess(input);
        setInput("");
        setSuggestions([]);
        setSelectedIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (suggestions.length > 0) {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex((prevIndex) => (prevIndex - 1 + suggestions.length) % suggestions.length);
            } else if (e.key === "Tab") {
                e.preventDefault();
                if (selectedIndex >= 0) {
                    handleSelect(suggestions[selectedIndex]);
                }
            } else if (e.key === "Enter") {
                handleSubmit();
            }
        }
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [selectedIndex]);

    return (
        <div className="w-full max-w-sm">
            <div className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    className="w-full border p-2 rounded"
                    value={input}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Tape un nom..."
                />
                {suggestions.length > 0 && (
                    <ul className="absolute top-full left-0 w-full bg-white border rounded shadow-md z-10">
                        {suggestions.map((s, i) => (
                            <li
                                key={i}
                                className={`p-2 hover:bg-gray-100 cursor-pointer ${i === selectedIndex ? "bg-gray-200" : ""}`}
                                onClick={() => handleSelect(s)}
                                onMouseEnter={() => setSelectedIndex(i)}
                            >
                                {s}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <button
                onClick={handleSubmit}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Valider
            </button>
        </div>
    );
}
