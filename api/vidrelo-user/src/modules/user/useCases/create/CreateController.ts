import { Request, Response } from 'express';
import { container } from 'tsyringe';
import axios from 'axios';
import { CreateUseCase } from './CreateUseCase';

export class CreateController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      telephone,
      email,
      password,
      profile,
      cep,
      state,
      district,
      street,
      number,
      complement,
      city,
    } = request.body;

    const createUseCase = container.resolve(CreateUseCase);
    const user = await createUseCase.create({
      name,
      telephone,
      email,
      password,
      profile,
      cep,
      state,
      district,
      street,
      number,
      complement,
      city,
    });
    axios
      .post('http://localhost:3006/v1/auth/createUser/', {
        name: user.name,
        password: user.password,
      })
      // eslint-disable-next-line func-names
      .catch(function (error) {
        if (error) {
          console.log(error);
        }
      });
    return response.json(user);
  }
}
