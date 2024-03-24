import { JSX, ParentProps, createSignal } from "solid-js";
import Modal from "../../common/components/Modal/Modal";
import createMutation from "../../common/hooks/createMutation";
import { CreateJobConnectionInput } from "../../schema/inputs";
import ConnectionService from "../../services/connection_service";
import { Job, JobConnection } from "../../schema/entities";
import toast from "solid-toast";
import Loading from "../../common/components/LoadingIndicator/Loading";
import { useAuth } from "../../providers/AuthProvider";

interface ApplyButtonProps {
  onApplySuccess: (result: JobConnection) => void;
  buttonClass?: JSX.HTMLElementTags["button"]["class"];
  job: Job;
}

const ApplyButton = (props: ApplyButtonProps) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [fee, setFee] = createSignal(0);
  const [message, setMessage] = createSignal("");
  const { auth } = useAuth();

  const { isLoading, mutate } = createMutation({
    mutate: async (input: CreateJobConnectionInput) =>
      await ConnectionService.createJobConnection(input),
    onSuccess: (result) => {
      toast.success("Apply for job successfully");
      props.onApplySuccess(result);
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error("Apply for job failed");
    },
  });

  return (
    <>
      <button
        class={props.buttonClass ?? "btn btn-primary"}
        onClick={() => setIsOpen(true)}
      >
        {isLoading() ? (
          <span class="loading loading-ring loading-sm text-base-content" />
        ) : (
          "Apply"
        )}
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

          <div class="flex flex-row items-center justify-center gap-4">
            <button class="btn btn-outline" onClick={() => setIsOpen(false)}>
              Cancle
            </button>
            <button
              disabled={isLoading()}
              class="btn btn-primary"
              onClick={async () => {
                await mutate({
                  jobId: props.job.id,
                  learnerUserId: props.job.learner.userId ?? "",
                  tutorId: auth.user?.tutorProfile.id ?? "",
                  tutorUserId: auth.user?.id ?? "",
                  type: "TUTOR_TO_JOB",
                });
              }}
            >
              {isLoading() ? <Loading /> : "Apply"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ApplyButton;
