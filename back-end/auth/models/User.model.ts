import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';

const prisma = new PrismaClient();

export class UserModel {
  async createNewUser(username: string, email: string, password: string): Promise<void> {
    try {
      const hashedPassword = await argon2.hash(password);

      const newUser = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          email,
        },
      });
      console.log('User created successfully:', newUser);
    } catch (error) {
      console.error('Failed to create user:', error);
    } finally {
      await prisma.$disconnect();
    }
  }
}
