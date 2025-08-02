import { postsRouter } from "@/module/posts/server/procedures";
import { createTRPCRouter } from "./init";

export const appRouter = createTRPCRouter({
  posts: postsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
