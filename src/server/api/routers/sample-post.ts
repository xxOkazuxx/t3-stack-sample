import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const samplePostRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
        return ctx.db.samplePost.findMany({
            orderBy: { createdAt: "desc" },
        });
    }),
    getPostById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            return ctx.db.samplePost.findUnique({ where: { id: parseInt(input.id) } });
        }),
    addPost: publicProcedure
        .input(z.object({ text: z.string(), content: z.string() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.samplePost.create({
                data: { text: input.text, content: input.content },
            });
        }),
    deletePost: publicProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.samplePost.delete({ where: { id: parseInt(input.id) } });
        }),
});
