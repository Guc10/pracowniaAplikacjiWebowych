import 'dotenv/config'
import { PrismaClient } from '../generated/prisma/client'
import express from 'express'
import { router } from './router'

const app = express()
const prisma = new PrismaClient()

app.use('/', router)

app.listen(3000, () => {
  console.log('Server started on port 3000')
})

async function main() {
  const allWpis = await prisma.wpis.findMany()
  console.log(allWpis)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })