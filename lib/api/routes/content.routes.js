import { Router } from "express";

import {
    getNews,
    getReviews,
} from "../controllers/content.controller.js";

const router = Router();

router.get("/news", getNews);
router.get("/reviews", getReviews);

export default router;