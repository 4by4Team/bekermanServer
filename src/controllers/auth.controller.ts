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

export const googleAuthCallback = async (req: Request, res: Response) => {
  console.log('Google auth callback triggered');
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const token = authService.generateToken(req.user);

    // Redirect to frontend with token
    
    
    res.redirect(`${process.env.CLIENT_URL}/auth/google/callback?token=${token}`);
  } catch (error) {
    res.status(500).json({ message: 'Server error during Google authentication' });
  }
};
