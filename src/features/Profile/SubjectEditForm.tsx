import { FiX } from "solid-icons/fi";
import { Show, createSignal } from "solid-js";
import { Subject, TutorProfileSubject } from "../../schema/entities";
import SelectSubjectField from "../Job/SelectSubjectField";
import createMutation from "../../common/hooks/createMutation";
import { UpdateTutorProfileSubjectInput } from "../../schema/inputs";
import ProfileService from "../../services/profile_service";
import toast from "solid-toast";
import { useProfileContext } from "./context/ProfileContextProvider";

interface SubjectEditFormProps {
  tutorProfileSubject: TutorProfileSubject;
}

const SubjectEditForm = (props: SubjectEditFormProps) => {
  const { updateTutorProfileSubject } = useProfileContext();
  const [selectedSubject, setSelectedSubject] = createSignal<Subject | null>(
    props.tutorProfileSubject.subject ?? null,
  );

  const [description, setDescription] = createSignal(
    props.tutorProfileSubject.description ?? "",
  );

  const { isLoading, mutate } = createMutation({
    mutate: async (input: UpdateTutorProfileSubjectInput) =>
      ProfileService.updateTutorProfileSubject(input),
    onSuccess: (result) => {
      toast.success("Updated subject successfully");
      updateTutorProfileSubject(result);
      return result;
    },
    onError: (error) => {
      toast.error("Failed to update subject " + error.message);
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
              tutorProfileId: props.tutorProfileSubject.tutorId,
              description: description(),
            })
          }
        >
          {isLoading() ? "Updating..." : "Update"}
        </button>
      </div>
    </>
  );
};

export default SubjectEditForm;
