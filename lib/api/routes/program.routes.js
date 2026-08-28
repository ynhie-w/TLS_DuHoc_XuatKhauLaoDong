import { Router } from "express";
import {
    getPrograms,
    getProgramTypes,
    getProgramServices,
    getProgramCertificates,
    getProgramLanguages,
} from "../controllers/program.controller.js";

const router = Router();

router.get("/", getPrograms);                    // GET /api/programs
router.get("/programTypes", getProgramTypes);    // GET /api/programs/programTypes
router.get("/programServices", getProgramServices);
router.get("/programCertificates", getProgramCertificates);
router.get("/programLanguages", getProgramLanguages);

export default router;