import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import RoleSwitcher from "../RoleSwitcher/roleSwitcher";

import "./header.css";

export default function Header({
    role = "student",
    onLogin,
    onRegister,
}) {
    const navigate = useNavigate();

    // ======================================================
    // HEADER SHOW / HIDE
    // ======================================================

    const [showHeader, setShowHeader] = useState(true);

    const lastScrollY = useRef(0);
    const scrollUpDistance = useRef(0);

    // ======================================================
    // ACCOUNT
    // ======================================================

    const [account, setAccount] = useState(() => {
        try {
            const savedAccount =
                localStorage.getItem("account");

            return savedAccount
                ? JSON.parse(savedAccount)
                : null;
        } catch (error) {
            console.error(
                "Không thể đọc account:",
                error
            );

            return null;
        }
    });

    // ======================================================
    // PROFILE DROPDOWN
    // ======================================================

    const [showProfileMenu, setShowProfileMenu] =
        useState(false);

    // ======================================================
    // HIDE / SHOW HEADER
    // ======================================================

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            const difference =
                currentScrollY - lastScrollY.current;

            if (currentScrollY <= 10) {
                setShowHeader(true);
                scrollUpDistance.current = 0;
            } else if (difference > 0) {
                scrollUpDistance.current = 0;
                setShowHeader(false);
                setShowProfileMenu(false);
            } else if (difference < 0) {
                scrollUpDistance.current += Math.abs(
                    difference
                );

                if (
                    scrollUpDistance.current >= 10
                ) {
                    setShowHeader(true);
                    scrollUpDistance.current = 0;
                }
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener(
            "scroll",
            handleScroll,
            {
                passive: true,
            }
        );

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll
            );
        };
    }, []);

    // ======================================================
    // ĐỒNG BỘ ACCOUNT
    // ======================================================

    useEffect(() => {
        const handleAuthChange = () => {
            try {
                const savedAccount =
                    localStorage.getItem("account");

                const newAccount = savedAccount
                    ? JSON.parse(savedAccount)
                    : null;

                setAccount(newAccount);

                if (!newAccount) {
                    setShowProfileMenu(false);
                }
            } catch (error) {
                console.error(
                    "Không thể cập nhật account:",
                    error
                );

                setAccount(null);
                setShowProfileMenu(false);
            }
        };

        window.addEventListener(
            "authChange",
            handleAuthChange
        );

        window.addEventListener(
            "storage",
            handleAuthChange
        );

        return () => {
            window.removeEventListener(
                "authChange",
                handleAuthChange
            );

            window.removeEventListener(
                "storage",
                handleAuthChange
            );
        };
    }, []);

    // ======================================================
    // MENU
    // ======================================================

    const menuByRole = {
        student: [
            {
                name: "Trang chủ",
                path: "/student/home",
            },
            {
                name: "Quốc gia",
                path: "/student/country",
            },
            {
                name: "Chương trình",
                path: "/student/program",
            },
            {
                name: "AI tư vấn",
                path: "/student/ai",
            },
            {
                name: "Tin tức",
                path: "/student/news",
            },
            {
                name: "Liên hệ",
                path: "/student/contact",
            },
        ],

        company: [
            {
                name: "Trang chủ",
                path: "/company/home",
            },
            {
                name: "Đăng tuyển",
                path: "/company/jobs",
            },
            {
                name: "Chương trình",
                path: "/company/programs",
            },
            {
                name: "Ứng viên",
                path: "/company/candidates",
            },
            {
                name: "Tin tức",
                path: "/company/news",
            },
            {
                name: "Liên hệ",
                path: "/company/contact",
            },
        ],

        broker: [
            {
                name: "Trang chủ",
                path: "/broker/home",
            },
            {
                name: "Chương trình",
                path: "/broker/programs",
            },
            {
                name: "Học viên",
                path: "/broker/students",
            },
            {
                name: "Đăng bài",
                path: "/broker/post",
            },
            {
                name: "Tin tức",
                path: "/broker/news",
            },
            {
                name: "Liên hệ",
                path: "/broker/contact",
            },
        ],

        admin: [
            {
                name: "Trang chủ",
                path: "/admin/home",
            },
            {
                name: "Người dùng",
                path: "/admin/users",
            },
            {
                name: "Chương trình",
                path: "/admin/programs",
            },
            {
                name: "Tin tức",
                path: "/admin/news",
            },
            {
                name: "Báo cáo",
                path: "/admin/reports",
            },
        ],
    };

    // ======================================================
    // ROLE
    // ======================================================

    const accountRole =
        account?.role?.name ||
        account?.role ||
        localStorage.getItem("role") ||
        role ||
        "student";

    // ======================================================
    // MENU THEO ROLE
    // ======================================================

    const menus =
        menuByRole[accountRole] ||
        menuByRole.student;

    // ======================================================
    // AVATAR
    // ======================================================

    const avatar =
        account?.avatar ||
        "/images/default-avatar.png";

    // ======================================================
    // HOME PATH
    // ======================================================

    const homePath =
        accountRole === "student"
            ? "/student/home"
            : accountRole === "company"
            ? "/company/home"
            : accountRole === "broker"
            ? "/broker/home"
            : accountRole === "admin"
            ? "/admin/home"
            : "/";

    // ======================================================
    // LOGIN SUCCESS
    // ======================================================

    useEffect(() => {
        const handleLoginSuccess = () => {
            const savedAccount =
                localStorage.getItem("account");

            if (!savedAccount) {
                return;
            }

            try {
                const user = JSON.parse(
                    savedAccount
                );

                setAccount(user);

                const userRole =
                    user?.role?.name ||
                    user?.role ||
                    localStorage.getItem("role") ||
                    "student";

                // Chuyển trang theo role
                if (userRole === "student") {
                    navigate("/student/home");
                } else if (userRole === "company") {
                    navigate("/company/home");
                } else if (userRole === "broker") {
                    navigate("/broker/home");
                } else if (userRole === "admin") {
                    navigate("/admin/home");
                }

            } catch (error) {
                console.error(
                    "LOGIN NAVIGATION ERROR:",
                    error
                );
            }
        };

        window.addEventListener(
            "authChange",
            handleLoginSuccess
        );

        return () => {
            window.removeEventListener(
                "authChange",
                handleLoginSuccess
            );
        };
    }, [navigate]);

    // ======================================================
    // PERSONAL INFORMATION
    // ======================================================

    const handlePersonalInfo = () => {
        setShowProfileMenu(false);

        navigate(
            `/${accountRole}/profile`
        );
    };

    // ======================================================
    // PROFILE
    // ======================================================

    const handleProfile = () => {
        setShowProfileMenu(false);

        navigate(
            `/${accountRole}/profile`
        );
    };

    // ======================================================
    // LOGOUT
    // ======================================================

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("account");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");

        setAccount(null);
        setShowProfileMenu(false);

        window.dispatchEvent(
            new Event("authChange")
        );

        navigate("/student/home");
    };

    // ======================================================
    // RENDER
    // ======================================================

    return (
        <header
            className={
                showHeader
                    ? "header-show"
                    : "header-hide"
            }
        >

            {/* ==================================================
                LOGO
            ================================================== */}

            <div className="logo">

                <NavLink to={homePath}>
                    TLS
                </NavLink>

            </div>

            {/* ==================================================
                MENU
            ================================================== */}

            <nav className="menu">

                <ul>

                    {menus.map((item) => (

                        <li key={item.path}>

                            <NavLink
                                to={item.path}
                                end={
                                    item.name ===
                                    "Trang chủ"
                                }
                                className={({ isActive }) =>
                                    isActive
                                        ? "active"
                                        : ""
                                }
                            >
                                {item.name}
                            </NavLink>

                        </li>

                    ))}

                </ul>

            </nav>

            {/* ==================================================
                ACTION
            ================================================== */}

            <div className="btn-dieu-huong">

                {/* ==================================================
                    CHƯA LOGIN
                ================================================== */}

                {!account && (
                    <>

                        <button
                            type="button"
                            className="button"
                            onClick={onRegister}
                        >
                            Đăng ký
                        </button>

                        <button
                            type="button"
                            className="button"
                            onClick={onLogin}
                        >
                            Đăng nhập
                        </button>

                        <RoleSwitcher />

                    </>
                )}

                {/* ==================================================
                    ĐÃ LOGIN
                ================================================== */}

                {account && (

                    <div className="user-menu">

                        <button
                            type="button"
                            className="user-button"
                            onClick={() =>
                                setShowProfileMenu(
                                    (prev) =>
                                        !prev
                                )
                            }
                        >

                            <img
                                src={avatar}
                                alt="Avatar"
                                className="user-avatar"
                                onError={(e) => {
                                    e.currentTarget.src =
                                        "/images/default-avatar.png";
                                }}
                            />

                            <span className="user-name">
                                {account.name ||
                                    account.email}
                            </span>

                            <span className="user-arrow">
                                {showProfileMenu
                                    ? "▲"
                                    : "▼"}
                            </span>

                        </button>

                        {/* ==================================================
                            DROPDOWN
                        ================================================== */}

                        {showProfileMenu && (

                            <div className="user-dropdown">

                                {/* USER INFO */}

                                <div className="user-info">

                                    <img
                                        src={avatar}
                                        alt="Avatar"
                                        className="dropdown-avatar"
                                        onError={(e) => {
                                            e.currentTarget.src =
                                                "/images/default-avatar.png";
                                        }}
                                    />

                                    <div className="user-info-text">

                                        <strong>
                                            {account.name ||
                                                "Người dùng"}
                                        </strong>

                                        <span>
                                            {account.email}
                                        </span>

                                        <small>
                                            Vai trò:{" "}
                                            {accountRole}
                                        </small>

                                    </div>

                                </div>

                                <div className="dropdown-divider" />

                                {/* THÔNG TIN CÁ NHÂN */}

                                <button
                                    type="button"
                                    onClick={
                                        handlePersonalInfo
                                    }
                                >
                                    <span>👤</span>

                                    Thông tin cá nhân
                                </button>

                                {/* PROFILE */}

                                <button
                                    type="button"
                                    onClick={
                                        handleProfile
                                    }
                                >
                                    <span>⚙️</span>

                                    Profile
                                </button>

                                <div className="dropdown-divider" />

                                {/* LOGOUT */}

                                <button
                                    type="button"
                                    className="logout-button"
                                    onClick={
                                        handleLogout
                                    }
                                >
                                    <span>🚪</span>

                                    Đăng xuất
                                </button>

                            </div>

                        )}

                    </div>

                )}

            </div>

        </header>
    );
}