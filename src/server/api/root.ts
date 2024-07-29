import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { documentRouter } from "./routers/document";
import { searchRouter } from "./routers/search";
import { searchResultRouter } from "./routers/searchResults";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  documentRouter,
  searchRouter,
  searchResultRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
