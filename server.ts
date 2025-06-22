import dotenv from 'dotenv'
dotenv.config()
import app from './src/index' // הקובץ שיצרת לאפליקציה אקספרס
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


const PORT = process.env.PORT || 3000

async function startServer() {
  try {
    await prisma.$connect()
    console.log('✅ Database connected')

    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`)
      console.log(`📚 Swagger at http://localhost:${PORT}/api-docs`)
    })
  } catch (error) {
    console.error('❌ Error connecting to database:', error)
    process.exit(1)
  }
}

startServer()
