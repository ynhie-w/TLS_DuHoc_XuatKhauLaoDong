import * as userService from "../services/user.service.js";

// ================= STUDENTS =================

export const getStudents = async (req, res) => {
    try {
        const data = await userService.getStudents();
        res.json({ success: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Không thể lấy danh sách học viên",
        });
    }
};

export const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await userService.getStudentById(id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy thông tin học viên",
            });
        }

        res.json({ success: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Không thể lấy thông tin học viên",
        });
    }
};

// ================= BROKERS =================

export const getBrokers = async (req, res) => {
    try {
        const data = await userService.getBrokers();
        res.json({ success: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Không thể lấy danh sách môi giới",
        });
    }
};

export const getBrokerById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await userService.getBrokerById(id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy thông tin môi giới",
            });
        }

        res.json({ success: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Không thể lấy thông tin môi giới",
        });
    }
};

// ================= COMPANIES =================

export const getCompanies = async (req, res) => {
    try {
        const data = await userService.getCompanies();
        res.json({ success: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Không thể lấy danh sách doanh nghiệp",
        });
    }
};

export const getCompanyById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await userService.getCompanyById(id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy thông tin doanh nghiệp",
            });
        }

        res.json({ success: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Không thể lấy thông tin doanh nghiệp",
        });
    }
};

// ================= ADMINS =================

export const getAdmins = async (req, res) => {
    try {
        const data = await userService.getAdmins();
        res.json({ success: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Không thể lấy danh sách quản trị viên",
        });
    }
};

export const getAdminById = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await userService.getAdminById(id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy thông tin quản trị viên",
            });
        }

        res.json({ success: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Không thể lấy thông tin quản trị viên",
        });
    }
};