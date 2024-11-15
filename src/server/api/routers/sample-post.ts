import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const samplePostRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
        return ctx.db.samplePost.findMany({
            orderBy: { createdAt: "desc" },
        });
    }),
    addPost: publicProcedure
        .input(z.object({ text: z.string(), content: z.string() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.samplePost.create({
                data: { text: input.text, content: input.content },
            });
        }),
});
