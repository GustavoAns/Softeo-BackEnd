import * as yup from 'yup'
import { IRegistros } from '../../types';

const schema = yup.object().shape({
  _id: yup.string(),
  cpf: yup.number().required(),
  initialDate: yup.string().required(),
  name: yup.string().required(),
  value: yup.number().required(),
  totalInstallments: yup.number().required(),
  payments: yup.array().of(yup.object().shape({
    number: yup.number(),
    value: yup.number(),
    paid: yup.boolean(),
    method: yup.string(),
    limiteDate: yup.string()
  })).required()
});

export class ValidRegistry {
  public async validBoolean(registros: IRegistros): Promise<boolean> {
    return await schema.isValid(registros)
  }
}