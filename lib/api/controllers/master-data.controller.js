import * as masterDataService from "../services/master-data.service.js";

export const getCountries = async (req, res) => {
    try {
        const data = await masterDataService.getCountries();
        res.json({ success: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Không thể lấy danh sách quốc gia" });
    }
};

export const getFields = async (req, res) => {
    try {
        const data = await masterDataService.getFields();
        res.json({ success: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Không thể lấy danh sách ngành học" });
    }
};

export const getEducationLevels = async (req, res) => {
    try {
        const data = await masterDataService.getEducationLevels();
        res.json({ success: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Không thể lấy danh sách trình độ học vấn" });
    }
};

export const getLanguages = async (req, res) => {
    try {
        const data = await masterDataService.getLanguages();
        res.json({ success: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Không thể lấy danh sách ngôn ngữ" });
    }
};

export const getCertificates = async (req, res) => {
    try {
        const data = await masterDataService.getCertificates();
        res.json({ success: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Không thể lấy danh sách chứng chỉ" });
    }
};

export const getCertificateLevels = async (req, res) => {
    try {
        const data = await masterDataService.getCertificateLevels();
        res.json({ success: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Không thể lấy danh sách cấp độ chứng chỉ" });
    }
};

export const getServices = async (req, res) => {
    try {
        const data = await masterDataService.getServices();
        res.json({ success: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Không thể lấy danh sách dịch vụ" });
    }
};