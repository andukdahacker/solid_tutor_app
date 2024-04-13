import {
  CreateEducationInput,
  CreateTutorProfileSubjectInput,
  CreateWorkExperienceInput,
  DeleteTutorProfileSubjectInput,
  UpdateEducationInput,
  UpdateTutorProfileInput,
  UpdateTutorProfileSubjectInput,
  UpdateWorkExperienceInput,
} from "../schema/inputs";
import {
  Education,
  TutorProfile,
  TutorProfileSubject,
  WorkExperience,
} from "../schema/entities";
import { Result } from "./result";
import client from "./client";

class ProfileService {
  static async updateTutorProfile(
    input: UpdateTutorProfileInput,
  ): Promise<Result<TutorProfile>> {
    try {
      const response = await client.PUT("/tutor-profile", { body: input });

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

  static async updateEducation(
    input: UpdateEducationInput,
  ): Promise<Result<Education>> {
    try {
      const response = await client.PUT("/education", { body: input });

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

  static async deleteEducation(id: string): Promise<Result<Education>> {
    try {
      const response = await client.DELETE("/education/{id}", {
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

  static async createWorkExperience(
    input: CreateWorkExperienceInput,
  ): Promise<Result<WorkExperience>> {
    try {
      const response = await client.POST("/work-experience", { body: input });

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

  static async updateWorkExperience(
    input: UpdateWorkExperienceInput,
  ): Promise<Result<WorkExperience>> {
    try {
      const response = await client.PUT("/work-experience", { body: input });

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

  static async deleteWorkExperience(
    id: string,
  ): Promise<Result<WorkExperience>> {
    try {
      const response = await client.DELETE("/work-experience/{id}", {
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

  static async createTutorProfileSubject(
    input: CreateTutorProfileSubjectInput,
  ): Promise<Result<TutorProfileSubject>> {
    try {
      const response = await client.POST("/tutor-profile/add-subject", {
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
    } catch (error) {
      return {
        ok: false,
        error: new Error(),
      };
    }
  }

  static async deleteTutorProfileSubject(
    input: DeleteTutorProfileSubjectInput,
  ): Promise<Result<TutorProfileSubject>> {
    try {
      const response = await client.DELETE("/tutor-profile/remove-subject", {
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
    } catch (error) {
      return {
        ok: false,
        error: new Error(),
      };
    }
  }

  static async updateTutorProfileSubject(
    input: UpdateTutorProfileSubjectInput,
  ): Promise<Result<TutorProfileSubject>> {
    try {
      const response = await client.PUT("/tutor-profile/update-subject", {
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
    } catch (error) {
      return {
        ok: false,
        error: new Error(),
      };
    }
  }
}

export default ProfileService;
