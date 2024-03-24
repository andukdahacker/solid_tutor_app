import { Job, JobConnection, Paginated } from "../schema/entities";
import {
  AcceptJobConnectionInput,
  CreateJobInput,
  DeclineJobConnectionInput,
  DeleteJobConnectionInput,
  DisconnectJobConnectionInput,
  FindJobConnectionsInput,
  GetAcceptedJobConnectionInput,
} from "../schema/inputs";
import { AcceptJobConnectionResponse } from "../schema/responses";
import client from "./client";
import { Result } from "./result";

class JobService {
  static async createJob(input: CreateJobInput): Promise<Result<Job>> {
    try {
      const response = await client.POST("/job", { body: { ...input } });

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

  static async findJobById(jobId: string): Promise<Result<Job>> {
    try {
      const response = await client.GET("/job/{jobId}", {
        params: {
          path: {
            jobId,
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
      console.log(error);
      return {
        ok: false,
        error: new Error(),
      };
    }
  }

  static async getJobJobConnections(
    input: FindJobConnectionsInput,
  ): Promise<Result<Paginated<JobConnection>>> {
    try {
      const response = await client.GET("/job-connection/job", {
        params: {
          query: input,
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

  static async declineJobConnection(
    input: DeclineJobConnectionInput,
  ): Promise<Result<JobConnection>> {
    const response = await client.PUT("/job-connection/decline", {
      body: input,
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
  }

  static async acceptJobConnection(
    input: AcceptJobConnectionInput,
  ): Promise<Result<AcceptJobConnectionResponse>> {
    const response = await client.PUT("/job-connection/accept", {
      body: input,
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
  }

  static async getAcceptedJobConnection(
    input: GetAcceptedJobConnectionInput,
  ): Promise<Result<JobConnection>> {
    const response = await client.GET("/job-connection/accepted/{jobId}", {
      params: { path: input },
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
  }

  static async disconnectJobConnection(
    input: DisconnectJobConnectionInput,
  ): Promise<Result<JobConnection>> {
    const response = await client.PUT("/job-connection/disconnect", {
      body: input,
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
  }
}

export default JobService;
