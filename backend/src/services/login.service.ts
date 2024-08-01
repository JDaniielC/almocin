import bcrypt from 'bcrypt';
import { HttpNotFoundError,HttpBadRequestError } from '../utils/errors/http.error';
import UserRepository from '../repositories/user.repository';
import { generateToken } from '../utils/auth/generateToken';

class LoginService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async login(email: string, password: string): Promise<{
    token: string;
    userId: string;
  }> {
    const user = await this.userRepository.findOneByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new HttpNotFoundError({ msg: 'User not found or password incorrect' });
    }

    // Generate JWT token
    const token = generateToken(user.id);

    return {
      token,
      userId: user.id
    };
  }

  public async resetPassword(email: string, recoveryQuestion: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) {
      throw new HttpNotFoundError({ msg: 'User not found' });
    }

    if (user.recoveryQuestion !== recoveryQuestion) {
      throw new HttpBadRequestError({ msg: 'Invalid recovery question' });
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    user.password = hashedPassword;
    await this.userRepository.updateUser(user.id, user);
  }
}

export default LoginService;
