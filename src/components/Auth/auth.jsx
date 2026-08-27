import { useState } from "react";
import Login from "./login";
import Register from "./register";
import "./auth.css";

export default function Auth({
    initialMode = "login",
    onClose,
    onRegisterSuccess,
}) {
    const [mode, setMode] = useState(initialMode);

    return (
        <>
            {mode === "login" ? (
                <Login
                    onClose={onClose}
                    onRegister={() => setMode("register")}
                />
            ) : (
                <Register
                    onClose={onClose}
                    onLogin={() => setMode("login")}
                    onRegisterSuccess={onRegisterSuccess}
                />
            )}
        </>
    );
}