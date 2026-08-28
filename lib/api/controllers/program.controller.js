import * as programService from "../services/program.service.js";

export const getPrograms = async (req, res) => {
    try {
        const data = await programService.getPrograms();

        res.json({ success: true, data });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Không thể lấy danh sách chương trình đào tạo",
        });
    }
};

export const getProgramTypes = async (req, res) => {
    try {
        const data = await programService.getProgramTypes();

        res.json({ success: true, data });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Không thể lấy danh sách loại chương trình",
        });
    }
};

export const getProgramServices = async (req, res) => {
    try {
        const data = await programService.getProgramServices();

        res.json({ success: true, data });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Không thể lấy dịch vụ của chương trình",
        });
    }
};

export const getProgramCertificates = async (req, res) => {
    try {
        const data = await programService.getProgramCertificates();

        res.json({ success: true, data });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Không thể lấy yêu cầu chứng chỉ của chương trình",
        });
    }
};

export const getProgramLanguages = async (req, res) => {
    try {
        const data = await programService.getProgramLanguages();

        res.json({ success: true, data });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Không thể lấy yêu cầu ngôn ngữ của chương trình",
        });
    }
};