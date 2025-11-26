import express, { Request, Response } from 'express'
import { PrismaClient } from '../../generated/prisma/client'
import { asyncHandler} from '../middleware/asyncHandler'

const prisma = new PrismaClient()
const wpisRouter = express.Router()

wpisRouter.use(express.json())
wpisRouter.use(express.urlencoded({ extended: true }))

wpisRouter.get('/get', asyncHandler(async (req: Request, res: Response) => {
  const allWpis = await prisma.wpis.findMany()
  res.status(200).json(allWpis);
}))

wpisRouter.get('/get/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const oneWpis = await prisma.wpis.findUnique({
    where: {
      id: parseInt(id)
    }
  })
  res.status(200).json(oneWpis);
}))

wpisRouter.post('/post', asyncHandler(async (req: Request, res: Response) => {
  const { txt, KatId, KomId } = req.body;

  const addKomentarz = await prisma.wpis.create({
    data: {
      Text: txt,
      KomentarzId: parseInt(KomId),
      KategoriaId: parseInt(KatId)
    }
  })

  res.status(200).json(addKomentarz);
}))

wpisRouter.put('/put/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { txt, KatId, KomId } = req.body;

  const addKomentarz = await prisma.wpis.update({
    where: {
      id: parseInt(id),
    },
    data: {
      Text: txt,
      KomentarzId: parseInt(KomId),
      KategoriaId: parseInt(KatId)
    }
  })

  res.status(200).json(addKomentarz);
}))

wpisRouter.delete('/delete/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const delWpis = await prisma.wpis.delete({
    where: {
      id: parseInt(id)
    }
  })
  res.status(200).json(delWpis);
}))

export { wpisRouter }