import { Router } from "express";

import {
    getCountries,
    getFields,
    getEducationLevels,
    getLanguages,
    getCertificates,
    getCertificateLevels,
    getServices,
} from "../controllers/master-data.controller.js";

const router = Router();

router.get("/countries", getCountries);
router.get("/fields", getFields);
router.get("/education-levels", getEducationLevels);
router.get("/languages", getLanguages);
router.get("/certificates", getCertificates);
router.get("/certificate-levels", getCertificateLevels);
router.get("/services", getServices);

export default router;