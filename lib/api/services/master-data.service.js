import prisma from "../../prisma/client.js";

export const getCountries = () => {
    return prisma.countries.findMany();
};

export const getFields = () => {
    return prisma.fields.findMany();
};

export const getEducationLevels = () => {
    return prisma.educationlevels.findMany();
};

export const getLanguages = () => {
    return prisma.languages.findMany();
};

export const getCertificates = () => {
    return prisma.certificates.findMany();
};

export const getCertificateLevels = () => {
    return prisma.certificatelevels.findMany();
};

export const getServices = () => {
    return prisma.services.findMany();
};