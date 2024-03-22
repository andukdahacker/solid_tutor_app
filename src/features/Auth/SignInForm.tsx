import { useNavigate } from "@solidjs/router";
import { FiEye, FiEyeOff, FiKey, FiMail } from "solid-icons/fi";
import { Show, createSignal } from "solid-js";
import toast from "solid-toast";
import * as z from "zod";
import Loading from "../../common/components/LoadingIndicator/Loading";
import { ACCESS_TOKEN_KEY } from "../../common/constants";
import createForm from "../../common/hooks/createForm";
import createMutation from "../../common/hooks/createMutation";
import { useAuth } from "../../providers/AuthProvider";
import { LoginInput } from "../../schema/inputs";
import AuthService from "../../services/auth_service";

const SignInForm = () => {
  const [showPassword, setShowPassword] = createSignal(false);
  const { handleSubmit, register, fieldMap } = createForm<LoginInput>({
    email: "",
    password: "",
  });

  const { setAuth } = useAuth();

  const navigate = useNavigate()

  const { isLoading, mutate: signIn } = createMutation({
    mutate: async (input: LoginInput) => await AuthService.login(input),
    onSuccess: (result) => {
      toast.success("Sign in successfully");
      localStorage.setItem(ACCESS_TOKEN_KEY, result.access_token);
      setAuth({ authenticated: true, user: result.user });
      navigate('/explore')
    },
    onError: (error) => {
      toast.error(`Sign in failed: ${error.message}`);
    },
  });

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSubmit(async (values) => {
            await signIn(values);
          });
        }}
      >
        <div class="flex flex-col gap-2">
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text text-primary text-base">
                Email<span class="text-error"> *</span>
              </span>
            </div>
            <label class="input input-bordered input-primary flex items-center gap-2">
              <FiMail class="text-primary" />
              <input
                type="text"
                class="grow"
                placeholder="xyz@gmail.com"
                id="email"
                name="email"
                ref={(el) => {
                  register(el, "email", (val) => {
                    const emailSchema = z.string().email();

                    const result = emailSchema.safeParse(val);

                    if (result.success) {
                      return null;
                    } else {
                      return result.error.errors[0].message;
                    }
                  });
                }}
              />
            </label>
            <Show when={fieldMap().get("email")?.errors}>
              <div class="label">
                <div class="label-text-alt text-error">
                  {fieldMap().get("email")?.errors}
                </div>
              </div>
            </Show>
          </label>

          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text text-primary text-base">
                Password<span class="text-error"> *</span>
              </span>
            </div>
            <label class="input input-bordered input-primary flex items-center gap-2">
              <FiKey class="text-primary" />
              <input
                type={showPassword() ? "text" : "password"}
                class="grow"
                id="password"
                name="password"
                ref={(ref) => {
                  register(ref, "password", (val) => {
                    const passwordSchema = z
                      .string()
                      .min(8)
                      .regex(
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?]).*$/,
                        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol",
                      );

                    const result = passwordSchema.safeParse(val);

                    if (result.success) {
                      return null;
                    } else {
                      return result.error.errors[0].message;
                    }
                  });
                }}
              />
              <Show when={showPassword()}>
                <FiEyeOff onClick={() => setShowPassword(false)} />
              </Show>
              <Show when={!showPassword()}>
                <FiEye onClick={() => setShowPassword(true)} />
              </Show>
            </label>
            <Show when={fieldMap().get("password")?.errors}>
              <div class="label">
                <div class="label-text-alt text-error">
                  {fieldMap().get("password")?.errors}
                </div>
              </div>
            </Show>
          </label>

          <button
            class="btn btn-primary mt-10"
            type="submit"
            disabled={isLoading()}
          >
            {isLoading() ? <Loading /> : "Sign In"}
          </button>
        </div>
      </form>
    </>
  );
};

export default SignInForm;
