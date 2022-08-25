import express from 'express'
import { errorHandlerMiddleware } from './middleware'
import { registrosRoute } from './routes'

const api = express()

api.use(express.json())
api.use(express.urlencoded({ extended: true }))

api.use('/registros',registrosRoute )
api.get('/', (_, res) => res.send())

api.use(errorHandlerMiddleware)

export default api