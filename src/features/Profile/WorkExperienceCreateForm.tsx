import { Show } from "solid-js";
import createForm from "../../common/hooks/createForm";
import { CreateWorkExperienceInput } from "../../schema/inputs";
import createMutation from "../../common/hooks/createMutation";
import toast from "solid-toast";
import ProfileService from "../../services/profile_service";
import { useProfileContext } from "./context/ProfileContextProvider";

interface WorkExperienceCreateFormProps {
  onClose: () => void;
}

const WorkExperienceCreateForm = (props: WorkExperienceCreateFormProps) => {
  const { addWorkExperience } = useProfileContext();
  const { register, handleSubmit, watch, setField } =
    createForm<CreateWorkExperienceInput>({
      workplace: "",
      workplaceUrl: "",
      position: "",
      fromDate: "",
      isCurrent: false,
      description: "",
      toDate: "",
    });

  const watchIsCurrent = watch("isCurrent");

  const { mutate, isLoading } = createMutation({
    mutate: async (input: CreateWorkExperienceInput) =>
      await ProfileService.createWorkExperience(input),
    onSuccess: (result) => {
      addWorkExperience(result);
      toast.success("Created work experience successfully");
    },
    onError: (error) => {
      toast.error("Failed to create work experience" + error.message);
    },
  });

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSubmit(async (values) => {
            if (watchIsCurrent()) {
              setField("toDate", "");
            }
            await mutate(values);
            props.onClose();
          });
        }}
      >
        <div class="flex w-80 flex-col gap-4">
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text text-base text-primary">Position</span>
            </div>
            <label class="input input-bordered input-primary flex items-center gap-2">
              <input
                type="text"
                id="position"
                ref={(el) => {
                  register(el, "position");
                }}
              />
            </label>
          </label>

          <label class="form-control w-full">
            <div class="label">
              <span class="label-text text-base text-primary">Workplace</span>
            </div>
            <label class="input input-bordered input-primary flex items-center gap-2">
              <input
                type="text"
                id="workplace"
                ref={(el) => {
                  register(el, "workplace");
                }}
              />
            </label>
          </label>

          <label class="form-control w-full">
            <div class="label">
              <span class="label-text text-base text-primary">
                Workplace url
              </span>
            </div>
            <label class="input input-bordered input-primary flex items-center gap-2">
              <input
                type="text"
                id="workplaceUrl"
                ref={(el) => {
                  register(el, "workplaceUrl");
                }}
              />
            </label>
          </label>

          <label class="form-control w-full">
            <div class="label">
              <span class="label-text text-base text-primary">Description</span>
            </div>
            <textarea
              class="textarea textarea-bordered textarea-primary"
              id="description"
              ref={(el) => {
                register(el, "description");
              }}
            />
          </label>

          <label class="form-control flex w-full flex-row items-center justify-start gap-4">
            <div class="label">
              <span class="label-text text-base text-primary">Is current</span>
            </div>
            <input
              type="checkbox"
              class="checkbox"
              id="isCurrent"
              ref={(el) => {
                register(el, "isCurrent");
              }}
            />
          </label>

          <label class="form-control w-full">
            <div class="label">
              <span class="label-text text-base text-primary">From date</span>
            </div>
            <input
              type="date"
              id="fromDate"
              class="input input-bordered input-primary"
              ref={(el) => register(el, "fromDate")}
            />
          </label>

          <Show when={!watchIsCurrent()}>
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text text-base text-primary">To date</span>
              </div>
              <input
                type="date"
                id="toDate"
                class="input input-bordered input-primary"
                ref={(el) => register(el, "toDate")}
              />
            </label>
          </Show>

          <button
            class="btn btn-primary mt-6"
            type="submit"
            disabled={isLoading()}
          >
            {isLoading() ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </>
  );
};

export default WorkExperienceCreateForm;
