import express, { Express, Request, Response } from 'express'
import { logger} from './middleware/log'
import { errors } from './middleware/err'
import { quest } from './routers/quest'
import path from 'path'
import fs from 'fs/promises'

const app: Express = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(logger)

app.use(express.static('static'))

app.use('/api/', quest)
app.get('/check', async (req: Request, res: Response) => {
  const data = await fs.readFile(path.join(__dirname, '/logs/log.txt'), 'utf8')
  res.send(data)
})

app.use(errors)

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
