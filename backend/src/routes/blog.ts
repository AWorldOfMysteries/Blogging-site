import { Hono } from "hono"
import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { createBlog, updateBlog } from "@aworldofmysteries/medium-common"

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }, 
    Variables: {
        userId: string
    }
}>()


blogRouter.use('/*', async (c, next) => {
    const authHeader = c.req.header("Authorization") || ""
    
    try{
        const payload = await verify(authHeader, c.env.JWT_SECRET)
        
        if(payload){
            console.log(payload)
            c.set("userId", payload.id)
            await next()
        }
        else{
            c.status(403)
            return c.json("Invalid Access")
        }
    }catch(e){
        c.status(403)
        return c.json("You are not logged in")
    }
})

blogRouter.post('/', async(c) => {
    console.log("hi")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const authorId = c.get("userId")
    const body = await c.req.json()

    const { success } = createBlog.safeParse(body);
    if(!success){
      c.status(411)
      return c.json({
        message: "Incorrect Inputs"
      })
    }

    try{
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: authorId
            }
        })
        return c.json({
            id: blog.id
        })
    } catch(e){
        c.status(411)
        return c.json("Unable to post the blog right now")
    }
})
  
blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json()

    const { success } = updateBlog.safeParse(body);
    if(!success){
      c.status(411)
      return c.json({
        message: "Incorrect Inputs"
      })
    }

    try{
        const blog = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
            }
        })

        return c.json("Updated Text")

    } catch(e){
        c.status(411)
        return c.json("Unable to update the blog right now")
    }
})


blogRouter.get('/bulk', async (c) => {
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    
    
    
    try{
        const blogs = await prisma.post.findMany()
        console.log(blogs)
        return c.json(blogs)

    } catch(e){
        c.status(411)
        return c.json("Unable to get the blogs right now")
    }
})


blogRouter.get('/:id', async (c) => {

    const id = c.req.param("id")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json()

    try{
        const blog = await prisma.post.findUnique({
            where: {
                id
            }
        })

        if(!blog){
            return c.json("Requested blog doesn't exist")
        }

        return c.json(blog)

    } catch(e){
        c.status(411)
        return c.json("Unable to get the blog right now")
    }
})