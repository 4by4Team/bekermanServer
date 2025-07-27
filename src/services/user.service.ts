import { PrismaClient } from '@prisma/client';
import { User } from '../models/user.model';

const prisma = new PrismaClient();

export class UserService {
    // Create a new user
    async createUser(data: Omit<User, 'id'>): Promise<User> {
        return prisma.user.create({ data });
    }

    // Get all users
    async getAllUsers(): Promise<User[]> {
        return prisma.user.findMany();
    }

    // Get a user by ID
    async getUserById(id: number): Promise<User | null> {
        return prisma.user.findUnique({ where: { id } });
    }

    // Update a user by ID
    async updateUser(id: number, data: Partial<Omit<User, 'id'>>): Promise<User> {
        return prisma.user.update({
            where: { id },
            data,
        });
    }

    // Delete a user by ID
    async deleteUser(id: number): Promise<User> {
        return prisma.user.delete({ where: { id } });
    }
}