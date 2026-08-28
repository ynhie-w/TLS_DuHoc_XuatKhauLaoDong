import { Router } from "express";

import {
    getMessages,
    getNotifications,
} from "../controllers/communication.controller.js";

const router = Router();

router.get("/messages", getMessages);
router.get("/notifications", getNotifications);

export default router;