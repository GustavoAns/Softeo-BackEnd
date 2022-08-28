import mongoose from 'mongoose'
import { IPayment, IRegistros } from '../../types'

const RegistriesSchema = new mongoose.Schema<IRegistros>({
  cpf: Number,
  initialDate: String,
  name: String,
  value: Number,
  totalInstallments: Number,
  payments: [
    new mongoose.Schema<IPayment>({
      number: Number,
      value: Number ,
      paid: Boolean,
      method: String,
      limiteDate: String
    },{_id: false})
  ]
}, {
  timestamps: false,
  versionKey: false
})

export class RegistriesModels {
  public model
  constructor() {
    this.model = mongoose.model('Registries', RegistriesSchema)
  }
  
  public async editRegistryById(obj: IRegistros, id:string): Promise<IRegistros | null>  {
    const registries = await this.model.findByIdAndUpdate({ _id: id }, obj);
    return registries
  }

  public async addRegistry(obj: IRegistros): Promise<IRegistros> {
    const registries = await this.model.create(obj)
    return registries
  }

  public async listRegistries(): Promise<IRegistros[]> {
    const registries = await this.model.find()
    return registries
  }
}