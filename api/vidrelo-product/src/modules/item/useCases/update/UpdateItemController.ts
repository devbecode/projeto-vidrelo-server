import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateItem } from './UpdateItem';

export class UpdateItemController {
  async inactivate(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const inactive = container.resolve(UpdateItem);
    await inactive.inactive(id);
    return response.send();
  }
}
