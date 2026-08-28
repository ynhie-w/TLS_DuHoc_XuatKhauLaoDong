import prisma from "../../prisma/client.js";

export const getMessages = () => {
    return prisma.messages.findMany();
};

export const getNotifications = () => {
    return prisma.notifications.findMany();
};