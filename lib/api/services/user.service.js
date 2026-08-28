import prisma from "../../prisma/client.js";

// Khai báo danh sách tất cả các cột trong bảng User (ngoại trừ password)
const USER_WITHOUT_PASSWORD = {
    select: {
        id: true,
        email: true,
        phone: true,
        address: true,
        name: true,
        avatar: true,
        roleId: true,
        status: true,
        createdAt: true,
        updatedAt: true,
    },
};


export const getStudents = async () => {
    return await prisma.students.findMany({
        include: { users: USER_WITHOUT_PASSWORD },
    });
};

export const getBrokers = async () => {
    return await prisma.brokers.findMany({
        include: { users: USER_WITHOUT_PASSWORD },
    });
};

export const getCompanies = async () => {
    return await prisma.companies.findMany({
        include: { users: USER_WITHOUT_PASSWORD },
    });
};

export const getAdmins = async () => {
    return await prisma.admins.findMany({
        include: { users: USER_WITHOUT_PASSWORD },
    });
};

// ================= LẤY THEO ID =================

// Lấy 1 Student theo ID
export const getStudentById = async (id) => {
    return await prisma.students.findUnique({
        where: { id: Number(id) },
        include: { users: USER_WITHOUT_PASSWORD },
    });
};

// Lấy 1 Broker theo ID
export const getBrokerById = async (id) => {
    return await prisma.brokers.findUnique({
        where: { id: Number(id) },
        include: { users: USER_WITHOUT_PASSWORD },
    });
};

// Lấy 1 Company theo ID
export const getCompanyById = async (id) => {
    return await prisma.companies.findUnique({
        where: { id: Number(id) },
        include: { users: USER_WITHOUT_PASSWORD },
    });
};

// Lấy 1 Admin theo ID
export const getAdminById = async (id) => {
    return await prisma.admins.findUnique({
        where: { id: Number(id) },
        include: { users: USER_WITHOUT_PASSWORD },
    });
};