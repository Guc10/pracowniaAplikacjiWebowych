import express from 'express'
import { PrismaClient } from '../generated/prisma/client'
import { Kategoria_kategoria } from '../generated/prisma/client'

const prisma = new PrismaClient()
const kategoriaRouter = express.Router()

kategoriaRouter.use(express.json())
kategoriaRouter.use(express.urlencoded({ extended: true }))

kategoriaRouter.get('/get', async (req, res) => {
  const allKategoria = await prisma.kategoria.findMany()
  res.status(200).json(allKategoria);
})

kategoriaRouter.get('/get/:id', async (req, res) => {
  const { id } = req.params
  const oneKategoria = await prisma.kategoria.findUnique({
    where: {
      id: parseInt(id)
    }
  })
  res.status(200).json(oneKategoria);
})

kategoriaRouter.post('/post', async (req, res) => {
  const { cat, opis } = req.body;

  try {
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
  } catch (error) {
    return res.status(404).json({ error: error});
  }
})

kategoriaRouter.put('/put/:id', async (req, res) => {
  const { id } = req.params;
  const { cat, opis } = req.body;

  try {
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
  } catch (error) {
    return res.status(404).json({ error: error});
  }
})

kategoriaRouter.delete('/delete/:id', async (req, res) => {
  const { id } = req.params
  const exists = await prisma.kategoria.findUnique({where:{id: parseInt(id)}})
  if (!exists) {
    return res.status(404).json({"error": "wrong id was given"})
  }
  const delKategoria = await prisma.kategoria.delete({
    where: {
      id: parseInt(id)
    }
  })
  res.status(200).json(delKategoria);
})

export { kategoriaRouter }