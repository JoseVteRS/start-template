"use client"

import { useTRPC } from "@/trpc/client";
import { useQuery } from '@tanstack/react-query';

export const Posts =()=> {
    const trpc = useTRPC()
    const data = useQuery(trpc.posts.get.queryOptions())

    return (
        <div className="flex flex-col gap-4">
            {data.data?.map((post)=> (
                <div key={post.id} className="flex flex-col gap-2 bg-zinc-800 p-4 rounded-md">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                    <p className="text-sm text-gray-500">{post.content}</p>
                </div>
            ))}
        </div>
    )
}