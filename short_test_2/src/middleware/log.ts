import {Request, Response, NextFunction} from 'express'
import { prisma } from '../routers/quest'
import fs from 'fs/promises'
import path from 'path'

export const logger = async (req: Request, res: Response, next: NextFunction) => {
  const output = await prisma.log.create({
    data: {
      log: JSON.stringify(req.body)
    }
  })
  await fs.appendFile(path.join(__dirname, '../logs/log.txt'), JSON.stringify(output))
  console.log(output)

  next();
}