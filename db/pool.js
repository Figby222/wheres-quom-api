const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const databaseUrl = process.env.NODE_ENV === "test" ?
    process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: databaseUrl
        }
    }
}).$extends({
    result: {
        game: {
            completionTime: {
                needs: { endTime: true, startTime: true },
                compute(game) {
                    return game.endTime ? game.endTime - game.startTime : null;
                }
            }
        }
    }
});

module.exports = prisma;