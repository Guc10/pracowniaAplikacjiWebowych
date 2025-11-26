import dotenv from 'dotenv'
import express from 'express'
import { MongoClient, Db } from 'mongodb'

import { accessLog } from './middleware/accessLog'
import { errorLog } from './middleware/errorLog'

import { wpisRouter } from './routers/wpis-router'
import { komentarzRouter } from './routers/komentarz-router'
import { kategoriaRouter } from './routers/kategoria-router'

dotenv.config()

function requiredEnv(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`Missing required env var: ${name}`)
  return v
}

const app = express()
const url = requiredEnv('MONGODB_URL')
const dbName = requiredEnv('DATABASE_NAME')
export const accessCollectionName = requiredEnv('COLLECTION_ACCESS')
export const errorCollectionName = requiredEnv('COLLECTION_ERROR')

const client = new MongoClient(url)
export let db: Db | null = null

async function main() {
  await client.connect()
  db = client.db(dbName)
  console.log("MongoDB connected to: ", dbName)
}

main().catch((err) => {
  console.error('Failed to connect to DB', err)
  process.exit(1)
})

app.use(express.json())

app.use(accessLog)

app.use('/wpis', wpisRouter)
app.use('/komentarz', komentarzRouter)
app.use('/kategoria', kategoriaRouter)

app.use(errorLog)

app.listen(3000, () => {
  console.log('Server started on port 3000')
})