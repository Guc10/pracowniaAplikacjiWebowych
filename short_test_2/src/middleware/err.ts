import { Request, Response, NextFunction } from 'express'
import { prisma } from '../routers/quest'

export const errors = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const output = await prisma.errors.create({
    data: {
      err: 500,
      text: "Something went wrong",
    }
  })
  console.log(output)

  res.status(404).json({error: error?.message})
}