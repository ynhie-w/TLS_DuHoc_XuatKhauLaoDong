import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import RoleSwitcher from "../RoleSwitcher/roleSwitcher";

import "./header.css";

export default function Header({
    role = "student",
    onLogin,
    onRegister,
}) {
    const [showHeader, setShowHeader] = useState(true);

    const lastScrollY = useRef(0);
    const scrollUpDistance = useRef(0);

    // ======================================================
    // HIDE / SHOW HEADER WHEN SCROLL
    // ======================================================

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            const difference =
                currentScrollY - lastScrollY.current;

            // Đầu trang
            if (currentScrollY <= 10) {
                setShowHeader(true);
                scrollUpDistance.current = 0;
            }

            // Cuộn xuống → ẩn
            else if (difference > 0) {
                scrollUpDistance.current = 0;
                setShowHeader(false);
            }

            // Cuộn lên
            else if (difference < 0) {
                scrollUpDistance.current += Math.abs(
                    difference
                );

                // Cuộn lên đủ 10px → hiện
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
    // MENU THEO ROLE
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

    const menus =
        menuByRole[role] ||
        menuByRole.student;

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

            {/* ================= LOGO ================= */}

            <div className="logo">

                <NavLink
                    to={
                        role === "student"
                            ? "/student/home"
                            : role === "company"
                            ? "/company/home"
                            : role === "broker"
                            ? "/broker/home"
                            : "/admin/home"
                    }
                >
                    TLS
                </NavLink>

            </div>


            {/* ================= MENU ================= */}

            <nav className="menu">

                <ul>

                    {menus.map((item) => (

                        <li key={item.path}>

                            <NavLink
                                to={item.path}
                                end={item.name === "Trang chủ"}
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


            {/* ================= ACTION ================= */}

            <div className="btn-dieu-huong">

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

            </div>

        </header>
    );
}
