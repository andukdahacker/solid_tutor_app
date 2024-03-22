import { FiEye, FiEyeOff, FiKey, FiMail, FiUser } from "solid-icons/fi";
import { Show, createSignal } from "solid-js";
import toast from "solid-toast";
import * as z from "zod";
import Loading from "../../common/components/LoadingIndicator/Loading";
import createForm from "../../common/hooks/createForm";
import createMutation from "../../common/hooks/createMutation";
import { SignUpInput } from "../../schema/inputs";
import AuthService from "../../services/auth_service";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = createSignal(false);
  const { register, handleSubmit, fieldMap } = createForm<SignUpInput>({
    username: "",
    email: "",
    password: "",
  });

  const { isLoading, mutate: signUp } = createMutation({
    mutate: async (params: SignUpInput) => await AuthService.signUp(params),
    onSuccess: (result) => {
      toast.success("Sign up successfully");
    },
    onError: (error) => {
      toast.error(`Sign up failed ${error.message}`);
    },
  });

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await handleSubmit(async (values) => {
          await signUp(values);
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
              Username<span class="text-error"> *</span>
            </span>
          </div>
          <label class="input input-bordered input-primary flex items-center gap-2">
            <FiUser class="text-primary" />
            <input
              type="text"
              class="grow"
              placeholder="SonDo1999"
              id="username"
              name="username"
              ref={(el) => {
                register(el, "username", () => {
                  return null;
                });
              }}
            />
          </label>
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
          {isLoading() ? <Loading /> : "Sign Up"}
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
