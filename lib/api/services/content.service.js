import prisma from "../../prisma/client.js";

export const getNews = () => {
    return prisma.news.findMany();
};

export const getReviews = () => {
    return prisma.reviews.findMany();
};