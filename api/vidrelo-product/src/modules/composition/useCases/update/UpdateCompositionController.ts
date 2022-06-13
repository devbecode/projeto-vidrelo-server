import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateComposition } from './UpdateComposition';

export class UpdateCompositionController {
  async inactive(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const inactive = container.resolve(UpdateComposition);
    await inactive.inactivate(id);
    return response.send();
  }
}
