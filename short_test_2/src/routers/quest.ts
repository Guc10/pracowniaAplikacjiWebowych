import express, { Response, Request } from 'express'
import { PrismaClient } from '@prisma/client'
import {asyncHandler} from '../middleware/asyncHandler'

const quest = express.Router()
export const prisma = new PrismaClient()

quest.use(express.json())
quest.use(express.urlencoded({ extended: true }))

quest.get('/', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.body
  if (id !== "") {
    const output = await prisma.dataa.findUnique({
      where: { id: Number(id) }
    })
    res.status(200).send(output)
  }else{
    const output = await prisma.dataa.findMany()
    res.status(200).send(output)
  }
}))

quest.post('/', asyncHandler(async (req: Request, res: Response) => {
  const { text } = req.body
  const output = await prisma.dataa.create({
    data: {
      text: text
    }
  })

  res.status(200).send(output)
  res.redirect(303, '/')
}))

export { quest }