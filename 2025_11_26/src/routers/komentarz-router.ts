import express, { Request, Response } from 'express'
import { PrismaClient } from '../../generated/prisma/client'
import { asyncHandler} from '../middleware/asyncHandler'

const prisma = new PrismaClient()
const komentarzRouter = express.Router()

komentarzRouter.use(express.json())
komentarzRouter.use(express.urlencoded({ extended: true }))

komentarzRouter.get('/get', asyncHandler(async (req: Request, res: Response) => {
  const allKomentarz = await prisma.komentarz.findMany()
  res.status(200).json(allKomentarz);
}))

komentarzRouter.get('/get/:id',asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const oneKomentarz = await prisma.komentarz.findUnique({
    where: {
      id: parseInt(id)
    }
  })
  res.status(200).json(oneKomentarz);
}))

komentarzRouter.post('/post', asyncHandler(async (req: Request, res: Response) => {
  const { comm } = req.body;

  const addKomentarz = await prisma.komentarz.create({
    data: {
      Komentarz: comm,
    }
  })

  res.status(200).json(addKomentarz);
}))

komentarzRouter.put('/put/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { comm } = req.body;

  const updatedKomentarz = await prisma.komentarz.update({
    where: {
      id: parseInt(id)
    },
    data: {
      Komentarz: comm,
    }
  })

  res.status(200).json(updatedKomentarz);
}))

komentarzRouter.delete('/delete/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const delKomentarz = await prisma.komentarz.delete({
    where: {
      id: parseInt(id)
    }
  })
  res.status(200).json(delKomentarz);
}))

export { komentarzRouter }