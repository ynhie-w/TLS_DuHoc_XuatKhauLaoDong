import { NavLink } from "react-router-dom";
import "./footer.css";

export default function Footer() {
    return (
        <footer className="footer">

            {/* Phần trên */}
            <div className="footer-container">

                {/* Logo + giới thiệu */}
                <div className="footer-column footer-about">

                    <h2>TƯƠNG LAI SÁNG</h2>

                    <p>
                        Nền tảng kết nối cơ hội du học và xuất khẩu
                        lao động, đồng hành cùng bạn trên hành trình
                        xây dựng tương lai.
                    </p>

                    <div className="footer-social">
                        <a href="#" aria-label="Facebook">
                            Facebook
                        </a>

                        <a href="#" aria-label="TikTok">
                            TikTok
                        </a>

                        <a href="#" aria-label="YouTube">
                            YouTube
                        </a>
                    </div>

                </div>

                {/* Điều hướng */}
                <div className="footer-column">

                    <h3>ĐIỀU HƯỚNG</h3>

                    <ul>
                        <li>
                            <NavLink to="/student">
                                Trang chủ
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/country">
                                Quốc gia
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/program">
                                Chương trình
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/ai">
                                AI tư vấn
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/news">
                                Tin tức
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/contact">
                                Liên hệ
                            </NavLink>
                        </li>
                    </ul>

                </div>

                {/* Dịch vụ */}
                <div className="footer-column">

                    <h3>DỊCH VỤ</h3>

                    <ul>
                        <li>
                            <a href="#">
                                Du học
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                Xuất khẩu lao động
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                Tư vấn AI
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                Tìm kiếm việc làm
                            </a>
                        </li>
                    </ul>

                </div>

                {/* Liên hệ */}
                <div className="footer-column footer-contact">

                    <h3>LIÊN HỆ</h3>

                    <p>
                        📍 Đà Nẵng, Việt Nam
                    </p>

                    <p>
                        ☎ 0763 576 357
                    </p>

                    <p>
                        ✉ contact@tuonglaisang.com
                    </p>

                    <p>
                        🕐 Thứ 2 - Thứ 7: 08:00 - 17:00
                    </p>

                </div>

            </div>

            {/* Dòng cuối */}
            <div className="footer-bottom">

                <p>
                    © 2026 Tương Lai Sáng. All rights reserved.
                </p>

                <div>
                    <a href="#">Chính sách bảo mật</a>
                    <span>|</span>
                    <a href="#">Điều khoản sử dụng</a>
                </div>

            </div>

        </footer>
    );
}