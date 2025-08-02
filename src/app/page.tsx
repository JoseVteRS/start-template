import { Posts } from "@/module/posts/posts";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";


export default function Home() {
  prefetch(trpc.posts.get.queryOptions());

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="container mx-auto px-4 py-16 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Start Template
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl mb-12">
          Con TailwindCSS, Shadcn UI, Drizzle ORM, BetterAuth, React Hook Form,
          React Query, Zod, SuperJSON y TRPC
        </p>
        <div className="w-full max-w-5xl">
          <HydrateClient>
            <Posts />
          </HydrateClient>
        </div>
      </main>
    </div>
  );
}
