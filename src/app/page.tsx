import { Posts } from "@/module/posts/posts";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";


export default function Home() {
  prefetch(trpc.posts.get.queryOptions());

  return (
    <div>
      <main>
        <h1>Start Template</h1>
        <p>
          With TailwindCSS, Shadcn UI, Drizzle ORM, BetterAuth, React Hook Form,
          React Query, Zod, SuperJSON and TRPC
        </p>
        <HydrateClient>
          <Posts />
        </HydrateClient>
      </main>
    </div>
  );
}
