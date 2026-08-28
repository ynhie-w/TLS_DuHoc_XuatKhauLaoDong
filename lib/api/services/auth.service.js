/* global process */

import prisma from "../../prisma/client.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ======================================================
// GET USERS
// ======================================================

export const getUsers = async () => {
    return await prisma.users.findMany({
        select: {
            id: true,
            email: true,
            name: true,
            avatar: true,
            roleId: true,
            status: true,
            createdAt: true,
        },
    });
};

// ======================================================
// GET ROLES
// ======================================================

export const getRoles = async () => {
    return await prisma.roles.findMany();
};

// ======================================================
// LOGIN
// ======================================================

export const login = async (email, password) => {
    const user = await prisma.users.findUnique({
        where: {
            email: email.trim(),
        },
    });

    // Không tìm thấy tài khoản
    if (!user) {
        throw new Error(
            "Email hoặc mật khẩu không chính xác!"
        );
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new Error(
            "Email hoặc mật khẩu không chính xác!"
        );
    }

    // Kiểm tra trạng thái tài khoản
    if (user.status === "blocked") {
        throw new Error(
            "Tài khoản của bạn đã bị khóa!"
        );
    }

    if (user.status !== "active") {
        throw new Error(
            "Tài khoản không ở trạng thái hoạt động!"
        );
    }

    // ==================================================
    // JWT
    // ==================================================

    const secretKey =
        process.env.JWT_SECRET || "MY_SECRET_KEY";

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            roleId: user.roleId,
        },
        secretKey,
        {
            expiresIn: "1d",
        }
    );

    // ==================================================
    // Lấy role
    // ==================================================

    const role = await prisma.roles.findUnique({
        where: {
            id: user.roleId,
        },
    });

    // ==================================================
    // Tạo object user trả về frontend
    // ==================================================

    const account = {
        id: user.id,
        email: user.email,
        phone: user.phone,
        name: user.name,
        avatar: user.avatar,
        address: user.address,
        roleId: user.roleId,
        status: user.status,
        createdAt: user.createdAt,

        // role object
        role: role
            ? {
                  id: role.id,
                  name: role.name,
              }
            : null,
    };

    // ==================================================
    // RETURN
    // ==================================================

    return {
        token,
        user: account,
    };
};

// ======================================================
// REGISTER
// ======================================================

export const register = async (data) => {
    const {
        role,
        email,
        phone,
        password,
        name,
        address,
        profile,
    } = data;

    // ==================================================
    // 1. Kiểm tra email
    // ==================================================

    const existingEmail = await prisma.users.findUnique({
        where: {
            email,
        },
    });

    if (existingEmail) {
        throw new Error(
            "Email đã được sử dụng!"
        );
    }

    // ==================================================
    // 2. Kiểm tra phone
    // ==================================================

    const existingPhone = await prisma.users.findFirst({
        where: {
            phone,
        },
    });

    if (existingPhone) {
        throw new Error(
            "Số điện thoại đã được sử dụng!"
        );
    }

    // ==================================================
    // 3. Tìm role
    // ==================================================

    const roleData = await prisma.roles.findFirst({
        where: {
            name: role,
        },
    });

    if (!roleData) {
        throw new Error(
            "Loại tài khoản không hợp lệ!"
        );
    }

    // ==================================================
    // 4. Hash password
    // ==================================================

    const hashedPassword = await bcrypt.hash(
        password,
        10
    );

    // ==================================================
    // 5. Transaction
    // ==================================================

    const result = await prisma.$transaction(
        async (tx) => {
            const user = await tx.users.create({
                data: {
                    roleId: roleData.id,
                    email,
                    phone,
                    password: hashedPassword,
                    name,
                    address,
                },
            });

            // ================= STUDENT =================

            if (role === "student") {
                await tx.students.create({
                    data: {
                        userId: user.id,
                        dateOfBirth: new Date(
                            profile.dateOfBirth
                        ),
                        gender: profile.gender,
                        identityNumber:
                            profile.identityNumber,
                        educationLevelId:
                            profile.educationLevelId,
                    },
                });
            }

            // ================= BROKER =================

            if (role === "broker") {
                await tx.brokers.create({
                    data: {
                        userId: user.id,
                        dateOfBirth: new Date(
                            profile.dateOfBirth
                        ),
                        gender: profile.gender,
                        identityNumber:
                            profile.identityNumber,
                        licenseNumber:
                            profile.licenseNumber,
                        licenseIssuedDate: new Date(
                            profile.licenseIssuedDate
                        ),
                        experienceYears:
                            profile.experienceYears,
                        companyName:
                            profile.companyName,
                    },
                });
            }

            // ================= COMPANY =================

            if (role === "company") {
                await tx.companies.create({
                    data: {
                        userId: user.id,
                        representativeName:
                            profile.representativeName,
                        representativePosition:
                            profile.representativePosition,
                        businessCode:
                            profile.businessCode,
                        businessField:
                            profile.businessField,
                        licenseNumber:
                            profile.licenseNumber,
                        website:
                            profile.website,
                    },
                });
            }

            return user;
        }
    );

    // ==================================================
    // RETURN REGISTER
    // ==================================================

    return {
        id: result.id,
        role,
        email: result.email,
        phone: result.phone,
        name: result.name,
        address: result.address,
    };
};