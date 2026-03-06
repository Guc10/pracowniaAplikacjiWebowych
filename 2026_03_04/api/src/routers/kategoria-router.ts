import express from 'express'
import { prisma } from '../lib/prisma'

const kategoriaRouter = express.Router()

kategoriaRouter.get('/get', async (req, res) => {
    try {
        const all = await prisma.kategoria.findMany()
        res.status(200).json(all)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' })
    }
})

kategoriaRouter.get('/get/:id', async (req, res) => {
    try {
        const { id } = req.params
        const one = await prisma.kategoria.findUnique({ where: { id: parseInt(id) } })
        if (!one) {
            return res.status(404).json({ error: 'Category not found' })
        }
        res.status(200).json(one)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch category' })
    }
})

kategoriaRouter.post('/post', async (req, res) => {
    try {
        const { cat, opis } = req.body

        if (!cat || !opis) {
            return res.status(400).json({ error: 'cat and opis are required' })
        }

        const newKat = await prisma.kategoria.create({
            data: { Kategoria: cat, Opis: opis }
        })
        res.status(201).json(newKat)
    } catch (error) {
        res.status(500).json({ error: 'Failed to create category' })
    }
})

kategoriaRouter.put('/put/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { cat, opis } = req.body

        const exists = await prisma.kategoria.findUnique({ where: { id: parseInt(id) } })
        if (!exists) {
            return res.status(404).json({ error: 'Category not found' })
        }

        const updated = await prisma.kategoria.update({
            where: { id: parseInt(id) },
            data: {
                ...(cat && { Kategoria: cat }),
                ...(opis && { Opis: opis }),
            }
        })
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ error: 'Failed to update category' })
    }
})

kategoriaRouter.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        const exists = await prisma.kategoria.findUnique({ where: { id: parseInt(id) } })
        if (!exists) {
            return res.status(404).json({ error: 'Category not found' })
        }
        const deleted = await prisma.kategoria.delete({ where: { id: parseInt(id) } })
        res.status(200).json(deleted)
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete category' })
    }
})

export { kategoriaRouter }