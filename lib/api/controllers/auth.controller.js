import * as authService from "../services/auth.service.js";

// ======================================================
// GET USERS
// ======================================================

export const getUsers = async (req, res) => {
    try {
        const users = await authService.getUsers();

        return res.status(200).json({
            data: users,
        });
    } catch (error) {
        console.error("GET USERS ERROR:", error);

        return res.status(500).json({
            message:
                "Không thể lấy danh sách người dùng!",
        });
    }
};

// ======================================================
// GET ROLES
// ======================================================

export const getRoles = async (req, res) => {
    try {
        const roles = await authService.getRoles();

        return res.status(200).json({
            data: roles,
        });
    } catch (error) {
        console.error("GET ROLES ERROR:", error);

        return res.status(500).json({
            message:
                "Không thể lấy danh sách role!",
        });
    }
};

// ======================================================
// LOGIN
// ======================================================

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email
        if (!email || !email.trim()) {
            return res.status(400).json({
                message: "Vui lòng nhập email!",
            });
        }

        // Validate password
        if (!password) {
            return res.status(400).json({
                message: "Vui lòng nhập mật khẩu!",
            });
        }

        // Gọi service
        const result = await authService.login(
            email,
            password
        );

        console.log(
            "LOGIN SUCCESS:",
            result.user
        );

        // Trả response
        return res.status(200).json({
            token: result.token,
            user: result.user,
        });
    } catch (error) {
        console.error(
            "LOGIN ERROR:",
            error.message
        );

        return res.status(401).json({
            message:
                error.message ||
                "Email hoặc mật khẩu không chính xác!",
        });
    }
};

// ======================================================
// REGISTER
// ======================================================

export const register = async (req, res) => {
    try {
        const result =
            await authService.register(req.body);

        return res.status(201).json({
            message:
                "Đăng ký tài khoản thành công!",
            data: result,
        });
    } catch (error) {
        console.error(
            "REGISTER ERROR:",
            error.message
        );

        return res.status(400).json({
            message:
                error.message ||
                "Đăng ký tài khoản thất bại!",
        });
    }
};