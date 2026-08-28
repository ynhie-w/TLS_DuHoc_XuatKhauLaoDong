import prisma from "../../prisma/client.js";

export const getPrograms = () => {
    return prisma.programs.findMany({
        include: {
            companies: {
                select: {
                    id: true,
                    users: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        }
                    }
                },
            },
            brokers:{
                select:{
                    id: true,
                    users:{
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        }
                    }
                }
            },
            countries: true,
            fields: true,
            programtypes: true,
        },

    });
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