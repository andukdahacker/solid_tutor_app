import { createSignal } from "solid-js";
import { useLocale } from "../../providers/LocaleProvider";
import Modal from "../../common/components/Modal/Modal";
import SignUpForm from "./SignUpForm";

const SignUpButton = () => {
  const { t } = useLocale();
  const [isOpen, setIsOpen] = createSignal(false);
  return (
    <>
      <button class="btn btn-primary" onClick={() => setIsOpen(true)}>
        {t("signUp")}
      </button>

      <Modal isOpen={isOpen()} onClose={() => setIsOpen(false)}>
        <SignUpForm />
      </Modal>
    </>
  );
};

export default SignUpButton;
