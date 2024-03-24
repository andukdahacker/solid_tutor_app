import { Show, createSignal } from "solid-js";
import Modal from "../../common/components/Modal/Modal";
import SelectSubjectField from "./SelectSubjectField";
import createForm from "../../common/hooks/createForm";
import { CreateJobInput } from "../../schema/inputs";
import { Subject } from "../../schema/entities";
import { FiX } from "solid-icons/fi";

const CreateJobButton = () => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [selectedSubject, setSelectedSubject] = createSignal<Subject | null>(
    null,
  );
  const { register, handleSubmit } = createForm<
    Omit<CreateJobInput, "subjectId">
  >({
    title: "",
    description: "",
    fee: 0,
    jobMethod: "BOTH",
    jobType: "TUTOR",
    numberOfSessions: 1,
  });
  return (
    <>
      <button class="btn btn-primary" onClick={() => setIsOpen(true)}>
        Create job
      </button>
      <Modal
        isOpen={isOpen()}
        onClose={() => setIsOpen(false)}
        title="Create job"
      >
        <form class="w-80">
          <div class="form-control w-full">
            <label>
              <span class="label-text mr-4">Subject</span>
              <Show when={selectedSubject()}>
                <div class="badge badge-primary badge-outline">
                  {selectedSubject()?.name}
                  <div
                    class="ml-2 cursor-pointer"
                    onClick={() => setSelectedSubject(null)}
                  >
                    <FiX />
                  </div>
                </div>
              </Show>
            </label>
            <Show when={!selectedSubject()}>
              <SelectSubjectField
                onSelect={(subject) => setSelectedSubject(subject)}
              />
            </Show>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Topic</span>
            </label>
            <input
              type="text"
              ref={(el) => register(el, "title")}
              class="input input-bordered"
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CreateJobButton;
