import { createSignal } from "solid-js";
import Modal from "../../common/components/Modal/Modal";
import { useLocale } from "../../providers/LocaleProvider";
import SignInForm from "./SignInForm";

const SignInButton = () => {
  const { t } = useLocale();
  const [isOpen, setIsOpen] = createSignal(false);
  return (
    <>
      <button class="btn btn-ghost" onClick={() => setIsOpen(true)}>
        {t("signIn")}
      </button>

      <Modal isOpen={isOpen()} onClose={() => setIsOpen(false)}>
        <SignInForm />
      </Modal>
    </>
  );
};

export default SignInButton;
