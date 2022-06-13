import { container } from 'tsyringe';

import { Mail } from '@modules/mail/domain/Mail';
import { FileTemplate } from '@shared/template/FileTemplate';

container.registerSingleton('mail', Mail);
container.registerSingleton('fileTemplate', FileTemplate);
