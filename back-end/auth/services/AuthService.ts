import { UserModel } from "../models/User.model";
import jwt from "jsonwebtoken";
const userModel = new UserModel();

export class UserService {
  /**
   * Register a new user.
   * @param username - The unique username of the user.
   * @param email - The email address of the user.
   * @param password - The raw password of the user.
   * @returns A promise resolving to a success message or throws an error if registration fails.
   */
  private static JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
  async registerUser(username: string, email: string, password: string): Promise<string> {
    
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
      throw new Error("Email is already in use.");
    }

    
    await userModel.createNewUser(username, email, password);

    return "User registered successfully.";
  }

  /**
   * Authenticate a user and generate a JWT token.
   * @param email - The email of the user trying to log in.
   * @param password - The raw password of the user.
   * @returns A JWT token if authentication is successful.
   */
  async authenticateUser(email: string, password: string): Promise<string> {
    const user = await userModel.findUserByEmail(email);

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    const isPasswordValid = await userModel.verifyPassword(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid email or password.");
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, UserService.JWT_SECRET, {
      expiresIn: "1h",
    });

    return token;
  }
}
