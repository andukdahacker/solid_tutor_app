import { User } from "../schema/entities";
import client from "./client";
import { Result } from "./result";

class UserService {
  static async getUserProfileById(id: string): Promise<Result<User>> {
    try {
      const response = await client.GET("/user/{id}", {
        params: { path: { id } },
      });

      if (response.error) {
        return {
          ok: false,
          error: new Error(response.error.message),
        };
      }

      return {
        ok: true,
        value: response.data,
      };
    } catch (error) {
      return {
        ok: false,
        error: new Error(),
      };
    }
  }
}

export default UserService;
