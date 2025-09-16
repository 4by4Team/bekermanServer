import { log } from 'console';
import * as authService from '../services/auth.service';
import { Request, Response } from 'express';
import { User } from '../models/user.model';

export const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.createUser(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await authService.loginUser(email, password);
    res.json(user);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await authService.changePassword(id, currentPassword, newPassword);
    res.json({ message: 'Password changed successfully' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const googleAuthCallback = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Google authentication failed' });
      return;
    }
    const user = req.user as User;
    const token = authService.generateToken(user);

    const clientUrl = process.env.CLIENT_URL || '*';
    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      tz: user.tz,
      role: user.role,
    };

    res.send(`
      <html>
        <body>
          <script>
            (function() {
              window.opener.postMessage(
                {
                  token: ${JSON.stringify(token)},
                  user: ${JSON.stringify(safeUser)}
                },
                ${JSON.stringify(clientUrl)}
              );
              window.close();
            })();
          </script>
        </body>
      </html>
    `);
    return;
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Server error' });
    return;
  }
};
