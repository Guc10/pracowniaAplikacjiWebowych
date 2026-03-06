import express from 'express'
import { prisma } from '../lib/prisma'

const komentarzRouter = express.Router()

komentarzRouter.get('/get', async (req, res) => {
    try {
        const all = await prisma.komentarz.findMany()
        res.status(200).json(all)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch comments' })
    }
})

// GET all comments for a specific post
komentarzRouter.get('/get/post/:wpisId', async (req, res) => {
    try {
        const { wpisId } = req.params
        const comments = await prisma.komentarz.findMany({
            where: { WpisId: parseInt(wpisId) }
        })
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch comments' })
    }
})

komentarzRouter.get('/get/:id', async (req, res) => {
    try {
        const { id } = req.params
        const one = await prisma.komentarz.findUnique({ where: { id: parseInt(id) } })
        if (!one) {
            return res.status(404).json({ error: 'Comment not found' })
        }
        res.status(200).json(one)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch comment' })
    }
})

komentarzRouter.post('/post', async (req, res) => {
    try {
        const { comm, wpisId } = req.body

        if (!comm || !wpisId) {
            return res.status(400).json({ error: 'comm and wpisId are required' })
        }

        const wpisExists = await prisma.wpis.findUnique({ where: { id: parseInt(wpisId) } })
        if (!wpisExists) {
            return res.status(404).json({ error: 'Post not found' })
        }

        const newComment = await prisma.komentarz.create({
            data: {
                Komentarz: comm,
                WpisId: parseInt(wpisId),
            }
        })
        res.status(201).json(newComment)
    } catch (error) {
        res.status(500).json({ error: 'Failed to create comment' })
    }
})

komentarzRouter.put('/put/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { comm } = req.body

        const exists = await prisma.komentarz.findUnique({ where: { id: parseInt(id) } })
        if (!exists) {
            return res.status(404).json({ error: 'Comment not found' })
        }

        const updated = await prisma.komentarz.update({
            where: { id: parseInt(id) },
            data: { Komentarz: comm }
        })
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ error: 'Failed to update comment' })
    }
})

komentarzRouter.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        const exists = await prisma.komentarz.findUnique({ where: { id: parseInt(id) } })
        if (!exists) {
            return res.status(404).json({ error: 'Comment not found' })
        }
        const deleted = await prisma.komentarz.delete({ where: { id: parseInt(id) } })
        res.status(200).json(deleted)
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete comment' })
    }
})

export { komentarzRouter }