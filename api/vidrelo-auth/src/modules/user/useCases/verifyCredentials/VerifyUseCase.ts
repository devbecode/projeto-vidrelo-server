import { ICredentials } from '@modules/user/dtos/UserDTO';
import { compareSync } from 'bcrypt';

export class VerifyUseCase {
  public verify(credentials: ICredentials): boolean {
    return compareSync(credentials.email, credentials.emailEncrypted);
  }
}
