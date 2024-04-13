import { Show, createSignal } from "solid-js";
import Modal from "../../common/components/Modal/Modal";
import SelectSubjectField from "./SelectSubjectField";
import createForm from "../../common/hooks/createForm";
import { CreateJobInput } from "../../schema/inputs";
import { Subject } from "../../schema/entities";
import { FiX } from "solid-icons/fi";
import { createMutable } from "solid-js/store";
import createMutation from "../../common/hooks/createMutation";
import JobService from "../../services/job_service";
import toast from "solid-toast";
import { useNavigate } from "@solidjs/router";

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
    numberOfSessions: 1,
  });

  const navigate = useNavigate();

  const { mutate, isLoading } = createMutation({
    mutate: async (input: CreateJobInput) => await JobService.createJob(input),
    onSuccess: (result) => {
      toast.success("Created job successfully");
      setIsOpen(false);
      navigate("/job/" + result.id);
      return result;
    },
    onError: (error) => {
      toast.error("Failed to create job");
      return error;
    },
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
        <form
          class="w-80"
          onSubmit={async (e) => {
            e.preventDefault();

            await handleSubmit(async (values) => {
              mutate({
                ...values,
                subjectId: selectedSubject()?.id ?? "",
                numberOfSessions: 1,
              });
            });
          }}
        >
          <div class="form-control w-full">
            <label>
              <span class="label-text mr-4">Subject</span>
              <Show when={selectedSubject()}>
                <div class="badge badge-primary badge-outline badge-lg">
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

          <div class="form-control">
            <label class="label">
              <span class="label-text">Location</span>
            </label>
            <select
              ref={(el) => register(el, "jobMethod")}
              class="select select-bordered"
            >
              <option value={"BOTH"}>BOTH</option>
              <option value={"ONLINE"}>ONLINE</option>
              <option value={"OFFLINE"}>OFFLINE</option>
            </select>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Fee</span>
            </label>
            <input
              type="number"
              min="0"
              max="1000000"
              step={100000}
              ref={(el) => register(el, "fee")}
              class="input input-bordered w-full"
            />
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Description</span>
            </label>

            <textarea
              class="textarea textarea-bordered"
              ref={(el) => register(el, "description")}
            />
          </div>

          <div class="mt-10 flex w-full flex-row items-center justify-center gap-4">
            <button class="btn btn-outline" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              disabled={isLoading()}
            >
              {isLoading() ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CreateJobButton;
