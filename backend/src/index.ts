import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'

import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog' 

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()



app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)


export default app


// "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiYmVlM2U2ZTctODEwMS00YTAyLWI2OTYtOTM4Yjk0YzZkNTZmIiwidGVuYW50X2lkIjoiYzYzMGUxNTg3N2Y1ZjBmYTFiYjU2MTJiZjRkNTEzZjAwY2YwNDZiNmU2YmRlZDRiN2M4MWMxMmE1ZmI0ZGU5NiIsImludGVybmFsX3NlY3JldCI6IjQ1NTJkNWZiLTM0OTQtNDdmOS1iMDc5LWU2MjUxMTk2ZDM2YSJ9.8VHrxUhzg2HrN5sAYnczPWQriqJ_EK7W1O9fUO4yfTY"

//"id": "0e0bcc46-61b0-4a03-a4b7-9f79baf1b71a"