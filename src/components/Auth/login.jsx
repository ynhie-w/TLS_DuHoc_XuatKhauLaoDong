import { useState } from "react";
import "./auth.css";

import { users, roles } from "../../mockData/data";

export default function Login({
    onClose,
    onRegister,
    onLoginSuccess,
}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // ================= VALIDATE =================

        if (!email.trim()) {
            alert("Vui lòng nhập email!");
            return;
        }

        if (!password) {
            alert("Vui lòng nhập mật khẩu!");
            return;
        }

        // ================= FIND USER =================

        const user = users.find(
            (item) =>
                item.email.toLowerCase() ===
                    email.trim().toLowerCase() &&
                item.password === password
        );

        if (!user) {
            alert("Email hoặc mật khẩu không chính xác!");
            return;
        }

        // ================= CHECK STATUS =================

        if (user.status !== "active") {
            alert("Tài khoản của bạn hiện không hoạt động!");
            return;
        }

        // ================= FIND ROLE =================

        const userRole = roles.find(
            (role) => role.id === user.roleId
        );

        if (!userRole) {
            alert("Không xác định được vai trò tài khoản!");
            return;
        }

        // ================= ACCOUNT =================

        const account = {
            id: user.id,
            roleId: user.roleId,
            role: userRole.name,
            email: user.email,
            phone: user.phone,
            avatar: user.avatar,
            name: user.name,
            address: user.address,
            status: user.status,
        };

        // ================= SAVE LOGIN =================

        localStorage.setItem(
            "account",
            JSON.stringify(account)
        );

        localStorage.setItem(
            "role",
            userRole.name
        );

        localStorage.setItem(
            "userId",
            user.id.toString()
        );

        console.log("Đăng nhập thành công:", account);

        alert(
            `Đăng nhập thành công với vai trò ${userRole.name}!`
        );

        // ================= SUCCESS =================

        onLoginSuccess?.(account);
    };

    return (
        <div className="login-box">

            {/* ================= BRAND ================= */}

            <div className="auth-brand">
                <h1>TUONG LAI SANG</h1>
                <h2>XUAT KHAU LAO DONG - DU HOC NUOC NGOAI</h2>
            </div>

            {/* ================= TABS ================= */}

            <div className="auth-tabs">

                <button
                    className="active"
                    type="button"
                >
                    ĐĂNG NHẬP
                </button>

                <button
                    type="button"
                    onClick={onRegister}
                >
                    ĐĂNG KÝ
                </button>

                <button
                    type="button"
                    onClick={onClose}
                >
                    THOÁT
                </button>

            </div>

            {/* ================= INTRO ================= */}

            <div className="auth-intro">

                <div className="intro-item">
                    <h2>
                        KHÁM PHÁ CƠ HỘI DU HỌC
                    </h2>

                    <h3>
                        Tìm hiểu chương trình phù hợp
                        và bắt đầu hành trình tương lai
                        của bạn.
                    </h3>
                </div>

                <div className="intro-item">
                    <h2>
                        TÌM KIẾM CƠ HỘI VIỆC LÀM
                    </h2>

                    <h3>
                        Khám phá những cơ hội việc làm
                        ở nước ngoài phù hợp với bạn.
                    </h3>
                </div>

                <div className="intro-item">
                    <h2>
                        ĐỊNH HƯỚNG CÙNG AI
                    </h2>

                    <h3>
                        Nhận gợi ý thông minh để lựa chọn
                        quốc gia và chương trình phù hợp.
                    </h3>
                </div>

            </div>

            {/* ================= FORM ================= */}

            <div className="auth-form">

                <h2>Đăng nhập</h2>

                <p className="login-description">
                    Đăng nhập để tiếp tục hành trình của bạn.
                </p>

                <form onSubmit={handleSubmit}>

                    {/* ================= EMAIL ================= */}

                    <div className="form-group">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Nhập email của bạn"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />

                    </div>

                    {/* ================= PASSWORD ================= */}

                    <div className="form-group">

                        <label>
                            Mật khẩu
                        </label>

                        <input
                            type="password"
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                    </div>

                    {/* ================= FORGOT PASSWORD ================= */}

                    <div className="forgot-password">

                        <button
                            type="button"
                            onClick={() =>
                                alert(
                                    "Chức năng quên mật khẩu đang được phát triển!"
                                )
                            }
                        >
                            Quên mật khẩu?
                        </button>

                    </div>

                    {/* ================= SUBMIT ================= */}

                    <button
                        type="submit"
                        className="button login-submit"
                    >
                        ĐĂNG NHẬP
                    </button>

                </form>

                {/* ================= DIVIDER ================= */}

                <div className="login-divider">
                    <span>hoặc</span>
                </div>

                {/* ================= GOOGLE ================= */}

                <button
                    type="button"
                    className="button login-google"
                    onClick={() =>
                        alert(
                            "Đăng nhập Google đang được phát triển!"
                        )
                    }
                >
                    Đăng nhập với Google
                </button>

                {/* ================= REGISTER ================= */}

                <p className="auth-switch">

                    Chưa có tài khoản?{" "}

                    <button
                        type="button"
                        onClick={onRegister}
                    >
                        Đăng ký
                    </button>

                </p>

            </div>

        </div>
    );
}