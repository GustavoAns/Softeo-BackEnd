/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express'

export const errorHandlerMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  const { name } = err
  switch (name) {
  default:
    res.sendStatus(500)
  }
}