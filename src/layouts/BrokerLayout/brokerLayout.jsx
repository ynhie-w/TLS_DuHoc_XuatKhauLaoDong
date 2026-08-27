import { Outlet } from "react-router-dom";
import { useState } from "react";

import TopBar from "../../components/TopBar/topBar";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import Auth from "../../components/Auth/auth";

function BrokerLayout() {
    const [authMode, setAuthMode] = useState(null);

    return (
        <>
            <TopBar />

            <Header
                role="broker"
                onLogin={() => setAuthMode("login")}
                onRegister={() => setAuthMode("register")}
                onClose={() => setAuthMode(null)}
            />

            <main className="company-layout">

                {authMode === null && <Outlet />}

                {authMode === "login" && (
                    <Auth
                        role="broker"
                        initialMode="login"
                        onClose={() => setAuthMode(null)}
                    />
                )}

                {authMode === "register" && (
                    <Auth
                        role="broker"
                        initialMode="register"
                        onClose={() => setAuthMode(null)}
                    />
                )}

            </main>

            <Footer />
        </>
    );
}

export default BrokerLayout;