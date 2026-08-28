import { Router } from "express";
import {
    getStudents,
    getStudentById,
    getBrokers,
    getBrokerById,
    getCompanies,
    getCompanyById,
    getAdmins,
    getAdminById,
} from "../controllers/user.controller.js";

const router = Router();

// Student Routes
router.get("/students", getStudents);
router.get("/students/:id", getStudentById);

// Broker Routes
router.get("/brokers", getBrokers);
router.get("/brokers/:id", getBrokerById);

// Company Routes
router.get("/companies", getCompanies);
router.get("/companies/:id", getCompanyById);

// Admin Routes
router.get("/admins", getAdmins);
router.get("/admins/:id", getAdminById);

export default router;