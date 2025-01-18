import { UserModel } from "../models/User.model";

const userModel = new UserModel();

export class UserService {
  /**
   * Register a new user.
   * @param username - The unique username of the user.
   * @param email - The email address of the user.
   * @param password - The raw password of the user.
   * @returns A promise resolving to a success message or throws an error if registration fails.
   */
  async registerUser(username: string, email: string, password: string): Promise<string> {
    
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
      throw new Error("Email is already in use.");
    }

    
    await userModel.createNewUser(username, email, password);

    return "User registered successfully.";
  }
}
