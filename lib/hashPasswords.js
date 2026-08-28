import bcrypt from "bcrypt";
import prisma from "./prisma/client.js";

const hashPasswords = async () => {
    try {
        const users = await prisma.users.findMany();

        for (const user of users) {
            // Bỏ qua nếu password đã được hash
            if (
                user.password.startsWith("$2a$") ||
                user.password.startsWith("$2b$") ||
                user.password.startsWith("$2y$")
            ) {
                continue;
            }

            const hashedPassword = await bcrypt.hash(
                user.password,
                10
            );

            await prisma.users.update({
                where: {
                    id: user.id,
                },
                data: {
                    password: hashedPassword,
                },
            });

            console.log(`Đã hash password user ID: ${user.id}`);
        }

        console.log("Hoàn tất hash password!");
    } catch (error) {
        console.error("Lỗi:", error);
    } finally {
        await prisma.$disconnect();
    }
};

hashPasswords();



