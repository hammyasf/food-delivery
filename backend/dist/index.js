"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const UserResolver_1 = require("./resolvers/UserResolver");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const prisma = new client_1.PrismaClient();
async function main() {
    const app = express_1.default();
    app.use(cookie_parser_1.default());
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await type_graphql_1.buildSchema({
            resolvers: [UserResolver_1.UserResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({
            prisma,
            req,
            res,
        }),
    });
    apolloServer.applyMiddleware({ app });
    app.listen(4000, () => {
        console.log("Server Started At http://localhost:4000");
    });
}
main()
    .catch((e) => {
    throw e;
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=index.js.map