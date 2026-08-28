import prisma from "../../prisma/client.js";

export const getPrograms = () => {
    return prisma.programs.findMany();
};

export const getProgramTypes = () => {
    return prisma.programtypes.findMany();
};

export const getProgramServices = () => {
    return prisma.programservices.findMany();
};

export const getProgramCertificates = () => {
    return prisma.programcertificates.findMany();
};

export const getProgramLanguages = () => {
    return prisma.programlanguages.findMany();
};