import * as authService from '../services/auth.service';
import { Request, Response } from 'express';


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
