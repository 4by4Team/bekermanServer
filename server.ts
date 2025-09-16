import dotenv from 'dotenv'
dotenv.config()
import app from './src/index'
import { PrismaClient } from '@prisma/client'
import passport from './src/config/passport';

const prisma = new PrismaClient()

const PORT = process.env.PORT || 3000

async function startServer() {
  try {
    await prisma.$connect()
    console.log('✅ Database connected')

    // app.use(passport.initialize());

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
