import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;



/*
npx prisma generate       # gerar client
npx prisma migrate dev    # enviar mudanças
npx prisma studio         # painel visual
npx prisma db push         # enviar sem migration (teste)
npx prisma db pull         # puxar schema do banco
*/