import { useState } from "react";
// Import useNavigate nếu bạn dùng react-router-dom cho trang riêng
// import { useNavigate } from "react-router-dom"; 
import "./auth.css";

export default function Login({
    onClose,
    onRegister,
    onLoginSuccess,
}) {
    // const navigate = useNavigate(); // Bỏ comment dòng này nếu là route riêng
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            alert("Vui lòng nhập email!");
            return;
        }

        if (!password) {
            alert("Vui lòng nhập mật khẩu!");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email.trim(),
                        password,
                    }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                alert(
                    result.message ||
                        "Email hoặc mật khẩu không chính xác!"
                );
                return;
            }

            const account = result.user;
            const token = result.token;

            if (!account || !account.id) {
                alert("Dữ liệu trả về từ server không hợp lệ!");
                return;
            }

            const userRole =
                account.role?.name ||
                account.role ||
                "student";

            // ==================================================
            // SAVE TO LOCALSTORAGE
            // ==================================================

            if (token) {
                // Đảm bảo tên key đồng nhất (ví dụ: "token" hoặc "accessToken")
                localStorage.setItem("token", token);
                localStorage.setItem("accessToken", token); 
            }

            localStorage.setItem("account", JSON.stringify(account));
            localStorage.setItem("role", userRole.toString());
            localStorage.setItem("userId", account.id.toString());

            // Thông báo cho Header cập nhật giao diện
            window.dispatchEvent(new Event("authChange"));

            // Gọi callback thông báo thành công cho component cha
            onLoginSuccess?.(account);

            // ==================================================
            // XỬ LÝ CHUYỂN TRANG / ĐÓNG MODAL
            // ==================================================
            
            // 1. Nếu Login là Modal Popup: Gọi onClose để tắt UI Login
            if (typeof onClose === "function") {
                onClose();
            }

            // 2. Nếu Login là Route/Page riêng: Chuyển hướng về Trang chủ
            // navigate("/"); 

        } catch (error) {
            console.error("LOGIN ERROR:", error);
            alert("Không thể kết nối đến server!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-box">
            <div className="auth-brand">
                <h1>TUONG LAI SANG</h1>
                <h2>XUAT KHAU LAO DONG - DU HOC NUOC NGOAI</h2>
            </div>

            <div className="auth-tabs">
                <button className="active" type="button">
                    ĐĂNG NHẬP
                </button>
                <button type="button" onClick={onRegister}>
                    ĐĂNG KÝ
                </button>
                <button type="button" onClick={onClose}>
                    THOÁT
                </button>
            </div>

            <div className="auth-intro">
                <div className="intro-item">
                    <h2>KHÁM PHÁ CƠ HỘI DU HỌC</h2>
                    <h3>Tìm hiểu chương trình phù hợp và bắt đầu hành trình tương lai của bạn.</h3>
                </div>
                <div className="intro-item">
                    <h2>TÌM KIẾM CƠ HỘI VIỆC LÀM</h2>
                    <h3>Khám phá những cơ hội việc làm ở nước ngoài phù hợp với bạn.</h3>
                </div>
                <div className="intro-item">
                    <h2>ĐỊNH HƯỚNG CÙNG AI</h2>
                    <h3>Nhận gợi ý thông minh để lựa chọn quốc gia và chương trình phù hợp.</h3>
                </div>
            </div>

            <div className="auth-form">
                <h2>Đăng nhập</h2>
                <p className="login-description">
                    Đăng nhập để tiếp tục hành trình của bạn.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Nhập email của bạn"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Mật khẩu</label>
                        <input
                            type="password"
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="forgot-password">
                        <button
                            type="button"
                            onClick={() =>
                                alert("Chức năng quên mật khẩu đang được phát triển!")
                            }
                        >
                            Quên mật khẩu?
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="button login-submit"
                        disabled={loading}
                    >
                        {loading ? "ĐANG ĐĂNG NHẬP..." : "ĐĂNG NHẬP"}
                    </button>
                </form>

                <div className="login-divider">
                    <span>hoặc</span>
                </div>

                <button
                    type="button"
                    className="button login-google"
                    onClick={() =>
                        alert("Đăng nhập Google đang được phát triển!")
                    }
                >
                    Đăng nhập với Google
                </button>

                <p className="auth-switch">
                    Chưa có tài khoản?{" "}
                    <button type="button" onClick={onRegister}>
                        Đăng ký
                    </button>
                </p>
            </div>
        </div>
    );
}