import { Router } from "express";

import {
    getApplications,
    getSavedPrograms,
    getStudentPreferences,
} from "../controllers/application.controller.js";

const router = Router();

router.get("/", getApplications);
router.get("/savedPrograms", getSavedPrograms);
router.get("/studentPreferences", getStudentPreferences);

export default router;