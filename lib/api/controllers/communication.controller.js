import * as communicationService from "../services/communication.service.js";

export const getMessages = async (req, res) => {
    try {
        const data = await communicationService.getMessages();

        res.json({ success: true, data });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Không thể lấy danh sách tin nhắn",
        });
    }
};

export const getNotifications = async (req, res) => {
    try {
        const data = await communicationService.getNotifications();

        res.json({ success: true, data });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Không thể lấy danh sách thông báo",
        });
    }
};