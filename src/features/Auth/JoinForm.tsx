import { Show, createSignal } from "solid-js";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

const JoinForm = () => {
  const [isSignUp, setIsSignUp] = createSignal(true);
  return (
    <>
      <Show when={isSignUp()}>
        <SignUpForm />
      </Show>

      <Show when={!isSignUp()}>
        <SignInForm />
      </Show>
      <div
        class="mt-10 cursor-pointer text-center text-info underline"
        onClick={() => setIsSignUp((value) => !value)}
      >
        {isSignUp()
          ? "Already have an account? Sign in"
          : "New here? Create an account"}
      </div>
    </>
  );
};

export default JoinForm;
