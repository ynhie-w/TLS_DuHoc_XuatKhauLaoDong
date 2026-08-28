import prisma from "../../prisma/client.js";

export const getApplications = () => {
    return prisma.applications.findMany();
};

export const getSavedPrograms = () => {
    return prisma.savedprograms.findMany();
};

export const getStudentPreferences = () => {
    return prisma.studentpreferences.findMany();
};