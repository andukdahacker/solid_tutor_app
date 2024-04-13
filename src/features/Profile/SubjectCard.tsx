import { FiEdit, FiTrash, FiUserCheck } from "solid-icons/fi";
import { TutorProfileSubject } from "../../schema/entities";
import { Show, createSignal } from "solid-js";
import Modal from "../../common/components/Modal/Modal";
import createMutation from "../../common/hooks/createMutation";
import {
  CreateTutorProfileSubjectInput,
  DeleteTutorProfileSubjectInput,
} from "../../schema/inputs";
import ProfileService from "../../services/profile_service";
import toast from "solid-toast";
import { useProfileContext } from "./context/ProfileContextProvider";
import SubjectEditForm from "./SubjectEditForm";
import { useAuth } from "../../providers/AuthProvider";

interface SubjectCardProps {
  tutorProfileSubject: TutorProfileSubject;
}

const SubjectCard = (props: SubjectCardProps) => {
  const { removeTutorProfileSubject } = useProfileContext();
  const subject = props.tutorProfileSubject.subject;
  const [isEditModalOpen, setIsEditModalOpen] = createSignal(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = createSignal(false);

  const { auth } = useAuth();

  const isOwner = () =>
    auth.user?.id == props.tutorProfileSubject.tutor?.userId;

  const { mutate, isLoading } = createMutation({
    mutate: async (input: DeleteTutorProfileSubjectInput) =>
      await ProfileService.deleteTutorProfileSubject(input),
    onSuccess: (result) => {
      toast.success("Deleted subject successfully");
      removeTutorProfileSubject(result);
      return result;
    },
    onError: (error) => {
      toast.error("Failed to delete subject " + error.message);
      return error;
    },
  });
  return (
    <>
      <div class="mb-4 flex flex-row">
        <FiUserCheck class="m-2 text-blue-500" size={24} />
        <div class="flex flex-col">
          <span class="text-md font-bold">{subject?.name}</span>
          <span class="text-md font-normal">
            {props.tutorProfileSubject?.description}
          </span>
        </div>
        <div class="grow"></div>
        <Show when={isOwner()}>
          <div class="flex flex-row gap-2">
            <button
              class="btn btn-ghost btn-sm"
              onClick={() => setIsEditModalOpen(true)}
            >
              <FiEdit />
            </button>
            <button
              class="btn btn-ghost btn-sm"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <FiTrash />
            </button>
          </div>
        </Show>
      </div>

      <Modal
        isOpen={isEditModalOpen()}
        onClose={() => setIsEditModalOpen(false)}
      >
        <SubjectEditForm tutorProfileSubject={props.tutorProfileSubject} />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen()}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <p>Are you sure you want to delete this education?</p>
        <div class="mt-4 flex flex-row items-center justify-center gap-4">
          <button
            class="btn btn-outline"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Cancel
          </button>
          <button
            class="btn btn-error"
            onClick={async () => {
              await mutate({
                subjectId: props.tutorProfileSubject.subjectId,
                tutorProfileId: props.tutorProfileSubject.tutorId,
              });
              setIsDeleteModalOpen(false);
            }}
            disabled={isLoading()}
          >
            {isLoading() ? "Deleting..." : "Delete"}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default SubjectCard;
