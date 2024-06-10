import { Job, JobConnection, Paginated } from "../schema/entities";
import { FindJobsByLearnerInput } from "../schema/inputs";
import client from "./client";
import { Result } from "./result";

class LearnerDashboardService {
  static async getLearnerJobs(
    input: FindJobsByLearnerInput,
  ): Promise<Result<Paginated<Job>>> {
    try {
      const response = await client.GET("/job/learner", {
        params: { query: { ...input } },
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

export default LearnerDashboardService;
