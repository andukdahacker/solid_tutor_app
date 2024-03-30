import {
  Accessor,
  Setter,
  Show,
  batch,
  createEffect,
  createSignal,
} from "solid-js";
import Modal from "../../common/components/Modal/Modal";
import { FiX } from "solid-icons/fi";
import toast from "solid-toast";
import Loading from "../../common/components/LoadingIndicator/Loading";
import createForm from "../../common/hooks/createForm";
import createMutation from "../../common/hooks/createMutation";
import { Job, Subject } from "../../schema/entities";
import { CreateJobInput, UpdateJobInput } from "../../schema/inputs";
import JobService from "../../services/job_service";
import SelectSubjectField from "./SelectSubjectField";
import { createStore } from "solid-js/store";

interface EditJobDetailModalProps {
  job: Accessor<Job | undefined>;
  onEditSuccess: (updatedJob: Job) => void;
  isOpen: Accessor<boolean>;
  setIsOpen: Setter<boolean>;
}

const EditJobDetailButton = (props: EditJobDetailModalProps) => {
  const [selectedSubject, setSelectedSubject] = createSignal<Subject | null>(
    props.job()?.subject ?? null,
  );

  const [initialInput, setInitialInput] = createStore<
    Omit<CreateJobInput, "subjectId">
  >({
    title: props.job()?.title ?? "",
    description: props.job()?.description ?? "",
    fee: props.job()?.fee ?? 0,
    jobMethod: props.job()?.jobMethod ?? "BOTH",
    numberOfSessions: props.job()?.numberOfSessions ?? 1,
  });

  const { register, handleSubmit } =
    createForm<Omit<CreateJobInput, "subjectId">>(initialInput);

  const { mutate, isLoading } = createMutation({
    mutate: async (input: UpdateJobInput) => await JobService.updateJob(input),
    onSuccess: (result) => {
      toast.success("Updated job successfully");
      props.onEditSuccess(result);
      setInitialInput(result);
      props.setIsOpen(false);
      return result;
    },
    onError: (error) => {
      toast.error("Failed to update job");
      return error;
    },
  });

  return (
    <>
      <Modal
        isOpen={props.isOpen()}
        onClose={() => props.setIsOpen(false)}
        title="Edit job"
      >
        <form
          class="w-80"
          onSubmit={async (e) => {
            e.preventDefault();

            await handleSubmit(async (values) => {
              mutate({
                ...values,
                subjectId: selectedSubject()?.id,
                id: props.job()?.id ?? "",
              });
            });
          }}
        >
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
            <button
              class="btn btn-outline"
              onClick={() => props.setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              disabled={isLoading()}
            >
              {isLoading() ? <Loading size="sm" /> : "Edit"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default EditJobDetailButton;
