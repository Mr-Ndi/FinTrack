import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';

const prisma = new PrismaClient();

export class UserModel {
  /**
   * Create a new user.
   * @param username - The unique username of the user.
   * @param email - The email address of the user.
   * @param password - The raw password of the user, which will be hashed for security.
   * @returns A promise that resolves when the user is successfully created.
   */
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

  /**
   * Find a user by email.
   * @param email - The email to search for.
   * @returns The user object if found, otherwise null.
   */
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }
}
