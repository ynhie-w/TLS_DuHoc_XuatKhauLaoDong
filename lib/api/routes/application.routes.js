import { Router } from "express";

import {
    getApplications,
    getSavedPrograms,
    getStudentPreferences,
} from "../controllers/application.controller.js";

const router = Router();

router.get("/", getApplications);
router.get("/saved-programs", getSavedPrograms);
router.get("/student-preferences", getStudentPreferences);

export default router;