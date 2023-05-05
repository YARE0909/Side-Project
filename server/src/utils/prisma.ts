import { PrismaClient } from "@prisma/client";

// Singleton Design Pattern
export default class Prisma {
    private static instance: PrismaClient;
    private constructor() { }

    public static getInstance(): PrismaClient {
        if (!Prisma.instance) {
            Prisma.instance = new PrismaClient();
        }
        return Prisma.instance
    }
}