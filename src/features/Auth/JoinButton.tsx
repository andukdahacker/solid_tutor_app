import { createSignal } from "solid-js";
import { useLocale } from "../../providers/LocaleProvider";
import Modal from "../../common/components/Modal/Modal";
import JoinForm from "./JoinForm";

const JoinButton = () => {
  const { t } = useLocale();
  const [isOpen, setIsOpen] = createSignal(false);
  return (
    <>
      <button class="btn btn-primary lg:hidden" onClick={() => setIsOpen(true)}>
        {t("start")}
      </button>
      <Modal
        isOpen={isOpen()}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <JoinForm />
      </Modal>
    </>
  );
};

export default JoinButton;
