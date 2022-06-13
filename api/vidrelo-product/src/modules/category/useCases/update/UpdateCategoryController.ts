import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateCategory } from './UpdateCategory';

export class UpdateCategoryController {
  public async inactive(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const updateUseCase = container.resolve(UpdateCategory);
    await updateUseCase.inactive(id);

    return response.send();
  }
}
