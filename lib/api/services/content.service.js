import prisma from "../../prisma/client.js";

export const getNews = () => {
    return prisma.news.findMany({
        include:{
            users:{
                select:{
                    name: true,
                }
            }
        }
    });
};

export const getReviews = () => {
    return prisma.reviews.findMany();
};