import { JSX } from "solid-js";
import { Job, JobConnection } from "../../schema/entities";
import createMutation from "../../common/hooks/createMutation";
import JobService from "../../services/job_service";
import { DeleteJobConnectionInput } from "../../schema/inputs";
import { useAuth } from "../../providers/AuthProvider";
import toast from "solid-toast";

interface RequestedButtonProps {
  job: Job;
  requestedButtonClass?: JSX.HTMLElementTags["button"]["class"];
  onUndoSuccess?: () => void;
  expand?: boolean;
}

const RequestedButton = (props: RequestedButtonProps) => {
  const { auth } = useAuth();
  const { isLoading, mutate } = createMutation({
    mutate: async (input: DeleteJobConnectionInput) =>
      await JobService.deleteJobConnection(input),
    onSuccess: (result) => {
      toast.success("Undo apply for job successfully");
      props.onUndoSuccess?.();
      return result;
    },
    onError: (error) => {
      toast.error("Undo apply for job failed");
      return error;
    },
  });

  return (
    <>
      <div
        class="dropdown dropdown-top md:dropdown-bottom"
        classList={{ "w-full": props.expand }}
      >
        <div
          tabindex="0"
          role="button"
          class={props.requestedButtonClass ?? "btn btn-primary"}
        >
          {isLoading() ? (
            <span class="loading loading-ring loading-sm" />
          ) : (
            "Applied"
          )}
        </div>
        <ul
          tabindex="0"
          class="menu dropdown-content z-[1] rounded-box bg-base-100 p-2 shadow"
          classList={{ "w-full": props.expand }}
        >
          <li
            onClick={() =>
              mutate({
                jobId: props.job.id,
                tutorId: auth.user?.tutorProfile.id ?? "",
              })
            }
          >
            <a class="flex w-full items-center justify-center">Undo</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default RequestedButton;
