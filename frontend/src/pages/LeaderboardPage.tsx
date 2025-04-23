import {useEffect, useState} from "react";
import {collection, getDocs, getFirestore, limit, orderBy, query} from "firebase/firestore";
import {Score} from "@/types/Score.ts";
import {Layout} from "@/components/Layout.tsx";

export const LeaderboardPage = () => {
    const [scores, setScores] = useState<Score[]>([]);
    const db = getFirestore();

    useEffect(() => {
        const fetchScores = async () => {
            const q = query(collection(db, "scores"), orderBy("score", "desc"), limit(10));
            const snapshot = await getDocs(q);
            setScores(snapshot.docs.map((doc) => doc.data() as Score));
        }
        fetchScores();
    }, []);

    return (
        <Layout>
            <div
                className="p-6 max-w-md mx-auto text-center flex flex-col items-center justify-center min-h-screen gap-4">
                <h1 className="text-2xl font-bold mb-4">🏆 Classement Global</h1>
                <ul className="space-y-2">
                    {scores.map((s, i) => (
                        <li key={i} className="bg-white p-3 rounded shadow">
                            <span className="font-semibold">{s.userEmail}</span> – {s.score} pts ({s.difficulty})
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
};