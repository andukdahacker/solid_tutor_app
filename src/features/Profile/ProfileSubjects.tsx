import { For, Show, createSignal } from "solid-js";
import Modal from "../../common/components/Modal/Modal";
import { User } from "../../schema/entities";
import SubjectCard from "./SubjectCard";
import SubjectCreateForm from "./SubjectCreateForm";
import { useAuth } from "../../providers/AuthProvider";

interface ProfileSubjectsProps {
  user: User;
}

const ProfileSubjects = (props: ProfileSubjectsProps) => {
  const subjects = () => props.user.tutorProfile.tutorProfileSubject;
  const [isCreateFormOpen, setIsCreateFormOpen] = createSignal(false);

  const { auth } = useAuth();

  const isOwner = () => auth.user?.id == props.user.id;
  return (
    <>
      <For each={subjects()}>
        {(val) => <SubjectCard tutorProfileSubject={val} />}
      </For>
      <Show when={isOwner()}>
        <div class="flex items-center justify-center">
          <button
            class="btn btn-primary"
            onClick={() => {
              setIsCreateFormOpen(true);
            }}
          >
            Add Subject
          </button>

          <Modal
            isOpen={isCreateFormOpen()}
            onClose={() => setIsCreateFormOpen(false)}
            title="Add Subject"
          >
            <SubjectCreateForm
              user={props.user}
              onClose={() => setIsCreateFormOpen(false)}
            />
          </Modal>
        </div>
      </Show>
    </>
  );
};

export default ProfileSubjects;
