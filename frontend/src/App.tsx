import {useEffect, useState} from "react";
import "./App.css";
import {onAuthStateChanged, User} from "firebase/auth";
import {auth} from "./utils/firebase";
import {AuthPage} from "./pages/AuthPage";
import {GamePage} from "./pages/GamePage.tsx";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";

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

    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    user ? <Navigate to="/game" replace/> : <Navigate to="/auth" replace/>
                }/>
                <Route path="/auth" element={<AuthPage/>}/>
                <Route path="/game" element={user ? <GamePage/> : <Navigate to="/auth" replace/>}/>
            </Routes>
        </Router>
    )
}

export default App;
