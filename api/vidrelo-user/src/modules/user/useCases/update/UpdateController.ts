/* eslint-disable prefer-const */
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
    const { profile } = request.body;

    let {
      name,
      password,
      telephone,
      cep,
      state,
      district,
      street,
      number,
      complement,
      city,
    } = request.body;

    if (
      !name ||
      !password ||
      !telephone ||
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
        let address = {
          name,
          password,
          telephone,
          cep,
          state,
          district,
          street,
          number,
          complement,
          city,
        };

        Object.keys(address).forEach(key => {
          if (
            address[key] === undefined ||
            address[key] == null ||
            address[key] === ''
          ) {
            switch (key) {
              case 'name':
                address[key] = userBeforeUpdate.name;
                break;
              case 'password':
                address[key] = userBeforeUpdate.password;
                break;
              case 'telephone':
                address[key] = userBeforeUpdate.telephone;
                break;
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

        name = address.name;
        password = address.password;
        telephone = address.telephone;
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
