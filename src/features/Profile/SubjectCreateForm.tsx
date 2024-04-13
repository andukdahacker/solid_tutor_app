import { Show, createSignal } from "solid-js";
import { Subject, User } from "../../schema/entities";
import { FiX } from "solid-icons/fi";
import SelectSubjectField from "../Job/SelectSubjectField";
import createMutation from "../../common/hooks/createMutation";
import { CreateTutorProfileSubjectInput } from "../../schema/inputs";
import ProfileService from "../../services/profile_service";
import toast from "solid-toast";
import { useProfileContext } from "./context/ProfileContextProvider";

interface SubjectCreateFormProps {
  onClose: () => void;
  user: User;
}

const SubjectCreateForm = (props: SubjectCreateFormProps) => {
  const { addTutorProfileSubject } = useProfileContext();
  const [selectedSubject, setSelectedSubject] = createSignal<Subject | null>(
    null,
  );

  const [description, setDescription] = createSignal("");

  const { mutate, isLoading } = createMutation({
    mutate: async (input: CreateTutorProfileSubjectInput) =>
      await ProfileService.createTutorProfileSubject(input),
    onSuccess: (result) => {
      toast.success("Created subject successfully");
      addTutorProfileSubject(result);
      props.onClose();
      return result;
    },
    onError: (error) => {
      toast.error("Failed to create subject " + error.message);
      return error;
    },
  });
  return (
    <>
      <div class="flex w-80 flex-col gap-4">
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
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text text-base text-primary">Description</span>
          </div>
          <textarea
            id="description"
            class="textarea textarea-bordered textarea-primary"
            value={description()}
            onInput={(e) => setDescription(e.currentTarget.value)}
          />
        </label>

        <button
          class="btn btn-primary mt-6"
          disabled={isLoading()}
          onClick={() =>
            mutate({
              subjectId: selectedSubject()?.id ?? "",
              tutorProfileId: props.user.tutorProfile.id,
              description: description(),
            })
          }
        >
          {isLoading() ? "Adding..." : "Add"}
        </button>
      </div>
    </>
  );
};

export default SubjectCreateForm;
