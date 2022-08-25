import { Router } from 'express'
import { RegistriesControllers } from '../../app/controllers'

const registriesRoute = Router()

const registriesControllers = new RegistriesControllers()

//getRegistry
registriesRoute.get('/:id', async (req, res) => {
  res.send(req)
})

//editRegistry
registriesRoute.put('/:id', async (req, res) => {
  res.send(req)
})

//removeRegistry
registriesRoute.delete('/:id', async (req, res) => {
  res.send(req)
})

//addRegistry
registriesRoute.post('/', async (req, res) => {
  res.send(req)
})
//listRegistries
registriesRoute.get('/', async (req, res) => {
  registriesControllers.listRegistries(req, res)
})

export { registriesRoute }