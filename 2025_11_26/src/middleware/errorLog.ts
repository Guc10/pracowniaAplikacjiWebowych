import { NextFunction, Request, Response } from 'express'
import { errorCollectionName, db } from '../index'

export const errorLog = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error?.status || 404
  const errorBody = {
    message: error?.message || 'Internal Server Error',
    status,
    method: req.method,
    path: req.originalUrl,
    body: req.body,
    timestamp: new Date()
  }

  if (db) {
    await db.collection(errorCollectionName).insertOne(errorBody)
  }

  res.status(status).json({ error: errorBody.status })
}