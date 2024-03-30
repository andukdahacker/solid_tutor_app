import { Show, createEffect } from "solid-js";
import createForm from "../../common/hooks/createForm";
import { Education, User } from "../../schema/entities";
import { CreateEducationInput, CreateJobInput } from "../../schema/inputs";
import createMutation from "../../common/hooks/createMutation";
import ProfileService from "../../services/profile_service";
import toast from "solid-toast";

interface EducationCreateFormProps {
  user: User;
  onCreateSuccess: (education: Education) => void;
}

const EducationCreateForm = (props: EducationCreateFormProps) => {
  const { register, handleSubmit, watch, setField } =
    createForm<CreateEducationInput>({
      educationEntity: "",
      fromDate: "",
      isCurrent: false,
      title: "",
      description: "",
      toDate: "",
      educationEntityUrl: "",
    });

  const watchIsCurrent = watch("isCurrent");

  const { mutate, isLoading } = createMutation({
    mutate: async (input: CreateEducationInput) =>
      await ProfileService.createEducation(input),
    onSuccess: (result) => {
      toast.success("Created education successfully");
      props.onCreateSuccess(result);
    },
    onError: (error) => {
      toast.error("Failed to create education" + error.message);
    },
  });

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await handleSubmit(async (values) => {
          console.log(values);
          //   if (watchIsCurrent()) {
          //     setField("toDate", "");
          //   }
          //   await mutate(values);
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
          {isLoading() ? "Adding..." : "Add"}
        </button>
      </div>
    </form>
  );
};

export default EducationCreateForm;
