import {Score} from "@/types/Score";
import {useEffect, useState} from "react";
import {collection, getDocs, getFirestore, orderBy, query, where} from "firebase/firestore";
import {auth} from "@/utils/firebase";
import {Layout} from "@/components/Layout.tsx";
import dayjs from "dayjs";

export const MyScoresPage = () => {
    const [scores, setScores] = useState<Score[]>([]);
    const db = getFirestore();

    useEffect(() => {
        const fetchMyScores = async () => {
            if (!auth.currentUser) return;
            const q = query(
                collection(db, "scores"),
                where("userId", "==", auth.currentUser.uid),
                orderBy("createdAt", "desc")
            );
            const snapshot = await getDocs(q);
            setScores(snapshot.docs.map((doc) => doc.data() as Score));
        };

        fetchMyScores();
    }, []);

    return (
        <Layout>
            <div className="p-6 max-w-xl mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-center">📜 Mon Historique</h1>
                {scores.length === 0 ? (
                    <p className="text-center text-gray-600">Aucun score enregistré pour l'instant.</p>
                ) : (
                    <ul className="space-y-3">
                        {scores.map((s, i) => (
                            <li key={i} className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-indigo-600">Score : {s.score}</p>
                                    <p className="text-sm text-gray-500">Difficulté : {s.difficulty}</p>
                                </div>
                                <p className="text-sm text-gray-400">{dayjs(s.createdAt?.toDate?.()).format("DD/MM/YYYY HH:mm")}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Layout>
    );
};