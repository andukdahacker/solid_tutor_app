import toast from "solid-toast";
import createForm from "../../common/hooks/createForm";
import DatetimeUtils from "../../common/utils/datetime_utils";
import { Education } from "../../schema/entities";
import { UpdateEducationInput } from "../../schema/inputs";
import ProfileService from "../../services/profile_service";
import createMutation from "../../common/hooks/createMutation";
import { useProfileContext } from "./context/ProfileContextProvider";
import { Show, createEffect, onMount } from "solid-js";

interface EducationEditFormProps {
  education: Education;
  onClose: () => void;
}

const EducationEditForm = (props: EducationEditFormProps) => {
  const { updateEducation } = useProfileContext();

  const { register, handleSubmit, watch, setField } = createForm<
    Omit<UpdateEducationInput, "id">
  >({
    educationEntity: props.education.educationEntity ?? "",
    fromDate: props.education.fromDate
      ? DatetimeUtils.fromSeconds(props.education.fromDate).toString()
      : "",
    toDate: props.education.toDate
      ? DatetimeUtils.fromSeconds(props.education.toDate).toString()
      : "",
    isCurrent: props.education.isCurrent ?? false,
    title: props.education.title ?? "",
    description: props.education.description ?? "",
    educationEntityUrl: props.education.educationEntityUrl ?? "",
  });

  const { mutate, isLoading } = createMutation({
    mutate: async (input: UpdateEducationInput) =>
      await ProfileService.updateEducation(input),
    onSuccess: (result) => {
      updateEducation(result);
      toast.success("Updated education successfully");
    },
    onError: (error) => {
      toast.error("Failed to update education" + error.message);
    },
  });

  const watchIsCurrent = watch("isCurrent");

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSubmit(async (values) => {
            if (watchIsCurrent()) {
              setField("toDate", "");
            }
            await mutate({ id: props.education.id, ...values });
            props.onClose();
          });
        }}
      >
        <div class="flex w-80 flex-col gap-4">
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text text-base text-primary">Title</span>
            </div>
            <label class="input input-bordered input-primary flex items-center gap-2">
              <input
                type="text"
                id="title"
                ref={(el) => {
                  register(el, "title");
                }}
              />
            </label>
          </label>

          <label class="form-control w-full">
            <div class="label">
              <span class="label-text text-base text-primary">
                Education entity
              </span>
            </div>
            <label class="input input-bordered input-primary flex items-center gap-2">
              <input
                type="text"
                id="educationEntity"
                ref={(el) => {
                  register(el, "educationEntity");
                }}
              />
            </label>
          </label>

          <label class="form-control w-full">
            <div class="label">
              <span class="label-text text-base text-primary">
                Education entity url
              </span>
            </div>
            <label class="input input-bordered input-primary flex items-center gap-2">
              <input
                type="text"
                id="educationEntityUrl"
                ref={(el) => {
                  register(el, "educationEntityUrl");
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
            {isLoading() ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </>
  );
};

export default EducationEditForm;
