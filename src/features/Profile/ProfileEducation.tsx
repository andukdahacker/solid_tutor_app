import { For, Show, createSignal } from "solid-js";
import { User } from "../../schema/entities";
import { FiBookOpen } from "solid-icons/fi";
import DatetimeUtils from "../../common/utils/datetime_utils";
import Modal from "../../common/components/Modal/Modal";
import EducationCreateForm from "./EducationCreateForm";
import EducationCard from "./EducationCard";
import { useAuth } from "../../providers/AuthProvider";

interface ProfileEducationProps {
  user: User;
}

const ProfileEducation = (props: ProfileEducationProps) => {
  const education = () => props.user.education ?? [];
  const [isCreateFormOpen, setIsCreateFormOpen] = createSignal(false);

  const { auth } = useAuth();

  const isOwner = () => auth.user?.id == props.user.id;

  return (
    <>
      <For each={education()}>{(val) => <EducationCard education={val} />}</For>
      <Show when={isOwner()}>
        <div class="flex items-center justify-center">
          <button
            class="btn btn-primary"
            onClick={() => {
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
            <EducationCreateForm onClose={() => setIsCreateFormOpen(false)} />
          </Modal>
        </div>
      </Show>
    </>
  );
};

export default ProfileEducation;
