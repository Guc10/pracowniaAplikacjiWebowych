import { Request, Response, NextFunction } from 'express'
import { accessCollectionName, db } from '../index'

export const accessLog = async (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now()

  res.on('finish', async () => {
    try {
      if(!db) return

      await db.collection(accessCollectionName).insertOne({
        method: req.method,
        path: req.originalUrl,
        headers: req.headers,
        body: req.body,
        timestamp: start
      })
    } catch (error) {
      console.error('accessing error: ', error)
    }
  })

  next()
}