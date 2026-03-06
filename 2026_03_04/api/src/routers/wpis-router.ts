import express from 'express'
import { prisma } from '../lib/prisma'

const wpisRouter = express.Router()

wpisRouter.get('/get', async (req, res) => {
    try {
        const allWpis = await prisma.wpis.findMany({
            include: { Kategoria: true }
        })
        res.status(200).json(allWpis)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' })
    }
})

wpisRouter.get('/get/:id', async (req, res) => {
    try {
        const { id } = req.params
        const oneWpis = await prisma.wpis.findUnique({
            where: { id: parseInt(id) },
            include: { Kategoria: true }
        })
        if (!oneWpis) {
            return res.status(404).json({ error: 'Post not found' })
        }
        res.status(200).json(oneWpis)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch post' })
    }
})

wpisRouter.post('/post', async (req, res) => {
    try {
        const { title, body, KatId } = req.body

        if (!title || !body || !KatId) {
            return res.status(400).json({ error: 'title, body and KatId are required' })
        }

        const katExists = await prisma.kategoria.findUnique({ where: { id: parseInt(KatId) } })
        if (!katExists) {
            return res.status(404).json({ error: 'Category not found' })
        }

        const newWpis = await prisma.wpis.create({
            data: {
                Title: title,
                Body: body,
                KategoriaId: parseInt(KatId),
            }
        })
        res.status(201).json(newWpis)
    } catch (error) {
        res.status(500).json({ error: 'Failed to create post' })
    }
})

wpisRouter.put('/put/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { title, body, KatId } = req.body

        const exists = await prisma.wpis.findUnique({ where: { id: parseInt(id) } })
        if (!exists) {
            return res.status(404).json({ error: 'Post not found' })
        }

        if (KatId) {
            const katExists = await prisma.kategoria.findUnique({ where: { id: parseInt(KatId) } })
            if (!katExists) {
                return res.status(404).json({ error: 'Category not found' })
            }
        }

        const updated = await prisma.wpis.update({
            where: { id: parseInt(id) },
            data: {
                ...(title && { Title: title }),
                ...(body && { Body: body }),
                ...(KatId && { KategoriaId: parseInt(KatId) }),
            }
        })
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ error: 'Failed to update post' })
    }
})

wpisRouter.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        const exists = await prisma.wpis.findUnique({ where: { id: parseInt(id) } })
        if (!exists) {
            return res.status(404).json({ error: 'Post not found' })
        }
        const deleted = await prisma.wpis.delete({ where: { id: parseInt(id) } })
        res.status(200).json(deleted)
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete post' })
    }
})

export { wpisRouter }