import { Router, Request, Response } from 'express';
import LoginService from '../services/login.service';
import { HttpError } from '../utils/errors/http.error';

class LoginController {
  public prefix: string = '/login';
  public router: Router;
  private loginService: LoginService;

  constructor(router: Router, loginService: LoginService) {
    this.router = router;
    this.loginService = loginService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(this.prefix, (req: Request, res: Response) => this.login(req, res));
    this.router.delete(this.prefix, (req: Request, res: Response) => this.logout(req, res));
  }

  private async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: 'Email and password are required' });
    }

    try {
      const token = await this.loginService.login(email, password);

      res.cookie('session_token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 horas
      });

      return res.status(200).json({ msg: 'Login successful', data: { token } });
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.status).json({ msg: error.msg });
      } else {
        console.error(error); // Log the unexpected error
        return res.status(500).json({ msg: 'An unexpected error occurred' });
      }
    }
  }

  private async logout(req: Request, res: Response) {
    res.clearCookie('session_token');
    return res.status(200).json({ msg: 'Logout successful' });
  }
}

export default LoginController;
