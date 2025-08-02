"use client"

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useQuery } from '@tanstack/react-query';
import Link from "next/link";

export const Posts =()=> {
    const trpc = useTRPC()
    const data = useQuery(trpc.posts.get.queryOptions())

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.data?.map((post)=> (
                <div key={post.id} className="flex flex-col gap-2 bg-zinc-100 p-4 rounded-md">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                    <p className="text-sm text-gray-500">{post.content}</p>
                    <Button asChild>
                        <Link href={`/posts/${post.id}`}>
                            View
                        </Link>
                    </Button>
                </div>

            ))}
        </div>
    )
}