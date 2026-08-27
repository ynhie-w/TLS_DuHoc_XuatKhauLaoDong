import { Outlet } from "react-router-dom";
import { useState } from "react";

import TopBar from "../../components/TopBar/topBar";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import Auth from "../../components/Auth/auth";
import "./studentLayout.css"
function StudentLayout() {
    const [authMode, setAuthMode] = useState(null);

    return (
        <><div className="student-layout">
            <TopBar />

            <Header
                role="student"
                onLogin={() => setAuthMode("login")}
                onRegister={() => setAuthMode("register")}
                onClose={() => setAuthMode(null)}
            />

            <main className="student-layout">

                {authMode === null && <Outlet />}

                {authMode === "login" && (
                    <Auth
                        role="student"
                        initialMode="login"
                        onClose={() => setAuthMode(null)}
                    />
                )}

                {authMode === "register" && (
                    <Auth
                        role="student"
                        initialMode="register"
                        onClose={() => setAuthMode(null)}
                    />
                )}

            </main>

            <Footer />
        </div>
            
        </>
    );
}

export default StudentLayout;