import * as userService from '../services/user.service';
import { Request, Response } from 'express';


export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
    try {
        const user = await userService.getUserById(id);
        if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
        }
        res.json(user);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const updatedUser = await userService.updateUser(id, req.body);
    res.json(updatedUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await userService.deleteUser(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
