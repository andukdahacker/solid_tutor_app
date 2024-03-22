import { createSignal } from "solid-js";
import Modal from "../../common/components/Modal/Modal";
import createMutation from "../../common/hooks/createMutation";
import { CreateJobConnectionInput } from "../../schema/inputs";
import ConnectionService from "../../services/connection_service";

const ApplyButton = () => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [fee, setFee] = createSignal(0);
  const [message, setMessage] = createSignal("");

  const {isLoading, mutate} = createMutation({
    mutate: async (input: CreateJobConnectionInput) => await ConnectionService.createJobConnection(input),
    onSuccess: (result) => {},
    onError: (error) => {}
  })
  return (
    <>
      <button class="btn btn-primary btn-sm" onClick={() => setIsOpen(true)}>
        Apply
      </button>
      <Modal
        isOpen={isOpen()}
        onClose={() => setIsOpen(false)}
        title="Apply for job"
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <label class="label">Suggested fee</label>
            <input
              class="input input-bordered"
              type="number"
              min={0}
              value={fee()}
              onInput={(e) => {
                setFee(Number.parseInt(e.target.value));
              }}
              max={1000000}
              step={100000}
            />
          </div>

          <div class="flex flex-col gap-2">
            <label class="label">Say something</label>
            <textarea
              class="textarea textarea-bordered"
              placeholder="Say something"
              value={message()}
              onInput={(e) => {
                setMessage(e.target.value);
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ApplyButton;
