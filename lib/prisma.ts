import { PrismaPg } from "@prisma/adapter-pg";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "../app/generated/prisma/client";

const createPrismaClient = () => {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  const usesAccelerate =
    connectionString.startsWith("prisma://") ||
    connectionString.startsWith("prisma+postgres://");

  const client: PrismaClient = usesAccelerate
    ? (new PrismaClient({
        accelerateUrl: connectionString,
        log: ["query"],
      }).$extends(withAccelerate()) as unknown as PrismaClient)
    : new PrismaClient({
        adapter: new PrismaPg({ connectionString }),
        log: ["query"],
      });

  return client;
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const prisma =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
