import { baseProcedure, createTRPCRouter } from "@/trpc/init";


export const postsRouter = createTRPCRouter({
    get: baseProcedure.query(async () => {
        return [
            {
                id: 1,
                title: 'Hello World',
                content: 'This is a test post',
            },
            {
                id: 2,
                title: 'Hello World 2',
                content: 'This is a test post 2',
            },
        ]
    })
})