import { FiBookOpen, FiDelete, FiEdit, FiTrash } from "solid-icons/fi";
import { Education } from "../../schema/entities";
import DatetimeUtils from "../../common/utils/datetime_utils";
import { Show, createSignal } from "solid-js";
import Modal from "../../common/components/Modal/Modal";
import EducationEditForm from "./EducationEditForm";
import createMutation from "../../common/hooks/createMutation";
import ProfileService from "../../services/profile_service";
import toast from "solid-toast";
import { useProfileContext } from "./context/ProfileContextProvider";
import { useAuth } from "../../providers/AuthProvider";

interface EducationCardProps {
  education: Education;
}

const EducationCard = (props: EducationCardProps) => {
  const val = props.education;
  const fromDate = val.fromDate
    ? DatetimeUtils.fromSeconds(val.fromDate).toLocaleDateString()
    : "??";
  const toDate = val.toDate
    ? DatetimeUtils.fromSeconds(val.toDate).toLocaleDateString()
    : "??";

  const [isEditModalOpen, setIsEditModalOpen] = createSignal(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = createSignal(false);

  const { removeEducation } = useProfileContext();

  const { mutate, isLoading } = createMutation({
    mutate: async () => await ProfileService.deleteEducation(val.id),
    onSuccess: (result) => {
      removeEducation(result);
      toast.success("Deleted education successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete education" + error.message);
    },
  });

  const { auth } = useAuth();

  const isOwner = () => auth.user?.id == val.userId;

  return (
    <>
      <div class="mb-4 flex flex-row">
        <FiBookOpen class="m-2 text-blue-500" size={24} />
        <div class="flex flex-col">
          <span class="text-md font-bold">{val.title}</span>
          <span class="text-md font-normal">
            {val.educationEntity} - {fromDate} to {toDate}
          </span>
          <span class="text-md font-normal">{val.description}</span>
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
        <EducationEditForm
          education={val}
          onClose={() => setIsEditModalOpen(false)}
        />
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
              await mutate(props.education.id);
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

export default EducationCard;
