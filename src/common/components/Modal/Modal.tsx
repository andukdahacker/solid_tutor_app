import { FiX } from "solid-icons/fi";
import { ParentProps, Show, onCleanup, onMount } from "solid-js";
import { Portal } from "solid-js/web";

interface ModalProps {
  onClose: () => void;
  isOpen: boolean;
  title?: string;
}

export const enum KeyCodesEnum {
  ESCAPE = "Escape",
}

const Modal = (props: ParentProps<ModalProps>) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case KeyCodesEnum.ESCAPE:
        e.stopPropagation();
        props.onClose();
        return;
      default:
        return;
    }
  };

  onMount(() => {
    document.addEventListener("keydown", handleKeyDown, true);
  });

  onCleanup(() => {
    document.removeEventListener("keydown", handleKeyDown, true);
  });

  return (
    <Portal>
      <Show when={props.isOpen}>
        <div
          class="fixed z-50 bg-black/70"
          style={{ inset: "0 0 0 0" }}
          onClick={() => {
            props.onClose();
          }}
        >
          <div
            class="fixed left-1/2 top-1/2 max-h-svh min-w-80 max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-scroll rounded-lg bg-base-100 p-6"
            role="dialog"
            onClick={(e) => {
              e.stopImmediatePropagation();
            }}
          >
            <div class="flex flex-row items-center justify-center">
              <div class="grow"></div>
              <span class="text-lg font-semibold">{props.title}</span>
              <div class="grow"></div>
              <FiX
                class="h-6 w-6 cursor-pointer"
                onClick={() => {
                  props.onClose();
                }}
              />
            </div>
            <div class="divider"></div>
            {props.children}
          </div>
        </div>
      </Show>
    </Portal>
  );
};

export default Modal;
