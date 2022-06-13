import { Router } from 'express';

import { CreateCompositionController } from '@modules/composition/useCases/create/CreateCompositionController';
import { ListCompositionsController } from '@modules/composition/useCases/list/ListCompositionsController';
import { UpdateCompositionController } from '@modules/composition/useCases/update/UpdateCompositionController';
import { checkToken } from '@shared/infra/http/middlewares/auth';

const compositionRoutes = Router();

const createItem = new CreateCompositionController();
const listCompositions = new ListCompositionsController();
const inactivateComposition = new UpdateCompositionController();

compositionRoutes.post('/composition', checkToken, createItem.create);

compositionRoutes.get(
  '/compositions',
  checkToken,
  listCompositions.listAllActive,
);
// compositionRoutes.get('/item/:id', checkToken, listItens.findDetailsById);

compositionRoutes.delete(
  '/composition/:id',
  checkToken,
  inactivateComposition.inactive,
);

export { compositionRoutes };
