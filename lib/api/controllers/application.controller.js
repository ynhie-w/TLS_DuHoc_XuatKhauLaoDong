import * as applicationService from "../services/application.service.js";

export const getApplications = async (req, res) => {
    try {
        const data = await applicationService.getApplications();

        res.json({
            success: true,
            data,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Không thể lấy danh sách hồ sơ ứng tuyển",
        });
    }
};

export const getSavedPrograms = async (req, res) => {
    try {
        const data = await applicationService.getSavedPrograms();

        res.json({
            success: true,
            data,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Không thể lấy danh sách chương trình đã lưu",
        });
    }
};

export const getStudentPreferences = async (req, res) => {
    try {
        const data = await applicationService.getStudentPreferences();

        res.json({
            success: true,
            data,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Không thể lấy nguyện vọng của học viên",
        });
    }
};