import { CreateEducationInput } from "../schema/inputs";
import { Education } from "../schema/entities";
import { Result } from "./result";
import client from "./client";

class ProfileService {
  static async createEducation(
    input: CreateEducationInput,
  ): Promise<Result<Education>> {
    try {
      const response = await client.POST("/education", { body: input });

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

export default ProfileService;
