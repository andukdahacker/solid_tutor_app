import { Show, createSignal } from "solid-js";
import Modal from "../../common/components/Modal/Modal";
import createMutation from "../../common/hooks/createMutation";
import JobService from "../../services/job_service";
import { Job } from "../../schema/entities";
import { Loader } from "solid-toast/dist/types/components";
import Loading from "../../common/components/LoadingIndicator/Loading";
import toast from "solid-toast";
import { useNavigate } from "@solidjs/router";

interface DeleteJobDetailButtonProps {
  job: Job;
}

const DeleteJobDetailButton = (props: DeleteJobDetailButtonProps) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const navigate = useNavigate();
  const { isLoading, mutate } = createMutation({
    mutate: async (input: string) => JobService.deleteJob(input),
    onSuccess: (result) => {
      toast.success("Deleted job successfully");
      setIsOpen(false);
      navigate("/learner-dashboard");
      return result;
    },
    onError: (error) => {
      toast.error("Failed to delete job");
      setIsOpen(false);
      return error;
    },
  });
  return (
    <>
      <button class="btn btn-error" onClick={() => setIsOpen(true)}>
        Delete
      </button>
      <Modal
        isOpen={isOpen()}
        onClose={() => setIsOpen(false)}
        title="Delete job"
      >
        <span>Are you sure you want to delete this job?</span>
        <div class="mt-6 flex flex-row items-center justify-center gap-4">
          <Show when={isLoading()}>
            <Loading />
          </Show>
          <Show when={!isLoading()}>
            <button class="btn btn-outline" onClick={() => setIsOpen(false)}>
              No
            </button>
            <button
              class="btn btn-error"
              onClick={() => {
                mutate(props.job.id ?? "");
              }}
            >
              Yes
            </button>
          </Show>
        </div>
      </Modal>
    </>
  );
};

export default DeleteJobDetailButton;
