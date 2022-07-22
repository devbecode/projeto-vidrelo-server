import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListUseCase } from '../listUsers/ListUseCase';
import { UpdateUseCase } from './UpdateUseCase';

export class UpdateController {
  public async updateById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const { name, password, telephone, profile } = request.body;

    // eslint-disable-next-line prefer-const
    let { cep, state, district, street, number, complement, city } =
      request.body;

    if (
      !cep ||
      !state ||
      !district ||
      !street ||
      !number ||
      !complement ||
      !city
    ) {
      try {
        const userBeforeUpdate = await container
          .resolve(ListUseCase)
          .findById(id);
        // eslint-disable-next-line prefer-const
        let address = {
          cep,
          state,
          district,
          street,
          number,
          complement,
          city,
        };
        console.log(address);
        Object.keys(address).forEach(key => {
          if (
            address[key] === undefined ||
            address[key] == null ||
            address[key] === ''
          ) {
            switch (key) {
              case 'cep':
                address[key] = userBeforeUpdate.cep;
                break;
              case 'state':
                address[key] = userBeforeUpdate.state;
                break;
              case 'district':
                address[key] = userBeforeUpdate.district;
                break;
              case 'street':
                address[key] = userBeforeUpdate.street;
                break;
              case 'number':
                address[key] = userBeforeUpdate.number;
                break;
              case 'complement':
                address[key] = userBeforeUpdate.complement;
                break;
              case 'city':
                address[key] = userBeforeUpdate.city;
                break;
              default:
                break;
            }
          }
        });

        cep = address.cep;
        state = address.state;
        district = address.district;
        street = address.street;
        number = address.number;
        complement = address.complement;
        city = address.city;
      } catch (error) {
        console.log(error);
      }
    }

    const updateUseCase = container.resolve(UpdateUseCase);
    const user = await updateUseCase.updateById({
      name,
      password,
      telephone,
      profile,
      id,
      cep,
      state,
      district,
      street,
      number,
      complement,
      city,
    });

    return response.json(user);
  }

  public async inactiveById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const updateUseCase = container.resolve(UpdateUseCase);
    await updateUseCase.inactve(id);

    return response.json({ result: 'User deleted' });
  }
}
