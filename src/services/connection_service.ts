import { JobConnection } from "../schema/entities";
import {
  CreateJobConnectionInput,
  DeleteJobConnectionInput,
} from "../schema/inputs";
import client from "./client";
import { Result } from "./result";

class ConnectionService {
  static async createJobConnection(
    input: CreateJobConnectionInput,
  ): Promise<Result<JobConnection>> {
    try {
      const response = await client.POST("/job-connection", {
        body: { ...input },
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
      console.log(error);

      return {
        ok: false,
        error: new Error(),
      };
    }
  }

  static async deleteJobConnection(
    input: DeleteJobConnectionInput,
  ): Promise<Result<JobConnection>> {
    try {
      const response = await client.POST("/job-connection/delete", {
        body: {
          ...input,
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
      console.log(error);

      return {
        ok: false,
        error: new Error(),
      };
    }
  }
}

export default ConnectionService;
