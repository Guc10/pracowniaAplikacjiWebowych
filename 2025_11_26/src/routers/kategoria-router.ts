import express, { Request, Response } from 'express'
import { PrismaClient } from '../../generated/prisma/client'
import { Kategoria_kategoria } from '../../generated/prisma/client'
import { asyncHandler} from '../middleware/asyncHandler'

const prisma = new PrismaClient()
const kategoriaRouter = express.Router()

kategoriaRouter.use(express.json())
kategoriaRouter.use(express.urlencoded({ extended: true }))

kategoriaRouter.get('/get', asyncHandler(async (req: Request, res: Response) => {
  const allKategoria = await prisma.kategoria.findMany()
  res.status(200).json(allKategoria);
}))

kategoriaRouter.get('/get/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const oneKategoria = await prisma.kategoria.findUnique({
    where: {
      id: parseInt(id)
    }
  })
  res.status(200).json(oneKategoria);
}))

kategoriaRouter.post('/post', asyncHandler( async (req: Request, res: Response) => {
  const { cat, opis } = req.body;

  if (cat && !Object.values(Kategoria_kategoria).includes(cat as Kategoria_kategoria)) {
    return res.status(400).json({
      "error": `Invalid category: ${cat}`,
      "validCategories": Object.values(Kategoria_kategoria)
    });
  }

  const addKategoria = await prisma.kategoria.create({
    data: {
      Kategoria: cat,
      Opis: opis,
    }
  })

  res.status(200).json(addKategoria);
}))

kategoriaRouter.put('/put/:id', asyncHandler( async (req: Request, res: Response) => {
  const { id } = req.params;
  const { cat, opis } = req.body;

  if (cat && !Object.values(Kategoria_kategoria).includes(cat as Kategoria_kategoria)) {
    return res.status(400).json({
      "error": `Invalid category: ${cat}`,
      "validCategories": Object.values(Kategoria_kategoria)
    });
  }

  const updatedKategoria = await prisma.kategoria.update({
    where: {
      id: parseInt(id)
    },
    data: {
      Kategoria: cat,
      Opis: opis,
    }
  })

  res.status(200).json(updatedKategoria);
}))

kategoriaRouter.delete('/delete/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const delKategoria = await prisma.kategoria.delete({
    where: {
      id: parseInt(id)
    }
  })
  res.status(200).json(delKategoria);
}))

export { kategoriaRouter }