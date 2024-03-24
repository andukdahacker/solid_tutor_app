import { Paginated, Subject } from "../schema/entities";
import { FindManySubjectsInput } from "../schema/inputs";
import client from "./client";
import { Result } from "./result";

class SubjectService {
  static async findSubjects(
    input: FindManySubjectsInput,
  ): Promise<Result<Paginated<Subject>>> {
    try {
      const response = await client.GET("/subject", {
        params: {
          query: {
            ...input,
          },
        },
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

export default SubjectService;
