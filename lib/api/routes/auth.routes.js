import { Router } from "express";
import { getUsers, getRoles, login, register } from "../controllers/auth.controller.js";

const router = Router();

router.get("/users", getUsers);
router.get("/roles", getRoles);
router.post("/login", login);
router.post("/register", register);
export default router;

// import { Router } from "express";
// import { getUsers, getRoles, login } from "../controllers/auth.controller.js";
// import { verifyToken } from "../middlewares/auth.middleware.js";

// const router = Router();

// // API Đăng nhập (Công khai - Ai cũng truy cập được)
// router.post("/login", login);

// // API Yêu cầu xác thực (Phải truyền Token mới xem được)
// router.get("/users", verifyToken, getUsers);
// router.get("/roles", verifyToken, getRoles);

// export default router;