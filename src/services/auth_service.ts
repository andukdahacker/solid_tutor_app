import { User } from "../schema/entities";
import { LoginInput, SignUpInput } from "../schema/inputs";
import { LoginResponse, RefreshTokenResponse } from "../schema/responses";
import client from "./client";
import { Result } from "./result";

class AuthService {
  static async signUp(input: SignUpInput): Promise<Result<User>> {
    try {
      const response = await client.POST("/auth/sign-up", {
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
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        error: new Error(),
      };
    }
  }

  static async logOut(): Promise<Result<string>> {
    const response = await client.POST("/auth/logOut");
    if (response.response.ok) {
      return {
        ok: true,
        value: "Logged out successfully",
      };
    }

    return {
      ok: false,
      error: new Error(response.response.statusText),
    };
  }

  static async login(input: LoginInput): Promise<Result<LoginResponse>> {
    const response = await client.POST("/auth/login", {
      body: input,
    });

    if (response.data) {
      return {
        ok: true,
        value: response.data,
      };
    }

    return {
      ok: false,
      error: new Error(response.error.message),
    };
  }

  static async refreshAccessToken(): Promise<Result<RefreshTokenResponse>> {
    const response = await client.POST("/auth/refreshToken");
    if (response.error) {
      return {
        ok: false,
        error: new Error(response.error.message),
      };
    }
    return {
      ok: true,
      value: response.data ?? "",
    };
  }

  static async me(): Promise<Result<User>> {
    try {
      const response = await client.GET("/auth/me");

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
    } catch (e) {
      return {
        ok: false,
        error: new Error(),
      };
    }
  }
}

export default AuthService;
