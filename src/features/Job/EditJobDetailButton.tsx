import {
  Accessor,
  Show,
  batch,
  createEffect,
  createSignal,
  onMount,
} from "solid-js";
import Modal from "../../common/components/Modal/Modal";
import { FiX } from "solid-icons/fi";
import toast from "solid-toast";
import createMutation from "../../common/hooks/createMutation";
import { CreateJobInput, UpdateJobInput } from "../../schema/inputs";
import JobService from "../../services/job_service";
import SelectSubjectField from "./SelectSubjectField";
import { Job, Subject } from "../../schema/entities";
import createForm from "../../common/hooks/createForm";
import Loading from "../../common/components/LoadingIndicator/Loading";
import { createStore } from "solid-js/store";
import EditJobDetailModal from "./EditJobDetailModal";

interface EditJobDetailButtonProps {
  onEditSuccess: (updatedJob: Job) => void;
  job: Accessor<Job | undefined>;
}

const EditJobDetailButton = (props: EditJobDetailButtonProps) => {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} class="btn btn-secondary">
        Edit
      </button>

      <EditJobDetailModal
        onEditSuccess={props.onEditSuccess}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        job={props.job}
      />
    </>
  );
};

export default EditJobDetailButton;
