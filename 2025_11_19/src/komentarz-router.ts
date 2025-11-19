import express from 'express'
import { PrismaClient } from '../generated/prisma/client'

const prisma = new PrismaClient()
const komentarzRouter = express.Router()

komentarzRouter.use(express.json())
komentarzRouter.use(express.urlencoded({ extended: true }))

komentarzRouter.get('/get', async (req, res) => {
  const allKomentarz = await prisma.komentarz.findMany()
  res.status(200).json(allKomentarz);
})

komentarzRouter.get('/get/:id', async (req, res) => {
  const { id } = req.params
  const oneKomentarz = await prisma.komentarz.findUnique({
    where: {
      id: parseInt(id)
    }
  })
  res.status(200).json(oneKomentarz);
})

komentarzRouter.post('/post', async (req, res) => {
  const { comm } = req.body;

  try {
    const addKomentarz = await prisma.komentarz.create({
      data: {
        Komentarz: comm,
      }
    })

    res.status(200).json(addKomentarz);
  } catch (error) {
    return res.status(404).json({ error: error});
  }
})

komentarzRouter.put('/put/:id', async (req, res) => {
  const { id } = req.params;
  const { comm } = req.body;

  try {
    const updatedKomentarz = await prisma.komentarz.update({
      where: {
        id: parseInt(id)
      },
      data: {
        Komentarz: comm,
      }
    })

    res.status(200).json(updatedKomentarz);
  } catch (error) {
    return res.status(404).json({ error: error});
  }
})

komentarzRouter.delete('/delete/:id', async (req, res) => {
  const { id } = req.params
  const exists = await prisma.komentarz.findUnique({where:{id: parseInt(id)}})
  if (!exists) {
    return res.status(404).json({"error": "wrong id was given"})
  }
  const delKomentarz = await prisma.komentarz.delete({
    where: {
      id: parseInt(id)
    }
  })
  res.status(200).json(delKomentarz);
})

export { komentarzRouter }