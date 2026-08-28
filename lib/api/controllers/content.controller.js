import * as contentService from "../services/content.service.js";

export const getNews = async (req, res) => {
    try {
        const data = await contentService.getNews();

        res.json({ success: true, data });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Không thể lấy danh sách tin tức",
        });
    }
};

export const getReviews = async (req, res) => {
    try {
        const data = await contentService.getReviews();

        res.json({ success: true, data });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Không thể lấy danh sách đánh giá",
        });
    }
};