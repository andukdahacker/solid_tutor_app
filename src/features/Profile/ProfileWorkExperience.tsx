import { For, Show, createSignal } from "solid-js";
import { User } from "../../schema/entities";
import Modal from "../../common/components/Modal/Modal";
import WorkExperienceCard from "./WorkExperienceCard";
import WorkExperienceCreateForm from "./WorkExperienceCreateForm";
import { useAuth } from "../../providers/AuthProvider";

interface ProfileWorkExperienceProps {
  user: User;
}

const ProfileWorkExperience = (props: ProfileWorkExperienceProps) => {
  const workExperience = () => props.user.workExperience ?? [];
  const [isCreateFormOpen, setIsCreateFormOpen] = createSignal(false);

  const { auth } = useAuth();

  const isOwner = () => auth.user?.id == props.user.id;

  return (
    <>
      <For each={workExperience()}>
        {(val) => <WorkExperienceCard workExperience={val} />}
      </For>
      <Show when={isOwner()}>
        <div class="flex items-center justify-center">
          <button
            class="btn btn-primary"
            onClick={() => {
              setIsCreateFormOpen(true);
            }}
          >
            Add Work Experience
          </button>

          <Modal
            isOpen={isCreateFormOpen()}
            onClose={() => setIsCreateFormOpen(false)}
            title="Add Work Experience"
          >
            <WorkExperienceCreateForm
              onClose={() => setIsCreateFormOpen(false)}
            />
          </Modal>
        </div>
      </Show>
    </>
  );
};

export default ProfileWorkExperience;
