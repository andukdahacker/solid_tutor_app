import { For, Show, createSignal } from "solid-js";
import { User } from "../../schema/entities";
import { FiBookOpen } from "solid-icons/fi";
import DatetimeUtils from "../../common/utils/datetime_utils";
import Modal from "../../common/components/Modal/Modal";
import EducationCreateForm from "./EducationCreateForm";

interface ProfileEducationProps {
  user: User;
}

const ProfileEducation = (props: ProfileEducationProps) => {
  const education = () => props.user.education ?? [];
  const [isCreateFormOpen, setIsCreateFormOpen] = createSignal(false);
  return (
    <>
      <For each={education()}>
        {(val) => {
          const fromDate = val.fromDate
            ? DatetimeUtils.fromSeconds(val.fromDate).toLocaleDateString()
            : "??";
          const toDate = val.toDate
            ? DatetimeUtils.fromSeconds(val.toDate).toLocaleDateString()
            : "??";

          return (
            <div class="flex flex-row">
              <FiBookOpen />
              <div class="flex flex-col">
                <span class="text-md font-bold">{val.title}</span>
                <span class="text-md font-normal">
                  {val.educationEntity} - {fromDate} to {toDate}
                </span>
              </div>
            </div>
          );
        }}
      </For>
      <Show when={education().length === 0}>
        <div class="flex items-center justify-center">
          <button
            class="btn btn-primary"
            onClick={() => {
              console.log("asdasd");
              setIsCreateFormOpen(true);
            }}
          >
            Add Education
          </button>

          <Modal
            isOpen={isCreateFormOpen()}
            onClose={() => setIsCreateFormOpen(false)}
            title="Add Education"
          >
            <EducationCreateForm
              user={props.user}
              onCreateSuccess={(education) => {}}
            />
          </Modal>
        </div>
      </Show>
    </>
  );
};

export default ProfileEducation;
