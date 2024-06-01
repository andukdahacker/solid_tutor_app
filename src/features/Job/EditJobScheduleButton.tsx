import { FiEdit } from "solid-icons/fi";
import { createSignal } from "solid-js";
import Modal from "../../common/components/Modal/Modal";
import { JobSchedule } from "../../schema/entities";
import dayjs from "dayjs";

interface EditJobScheduleButtonProps {
  schedule: JobSchedule;
}
const EditJobScheduleButton = (props: EditJobScheduleButtonProps) => {
  const startDate = () => dayjs(props.schedule.startTime);
  const startTime = () => dayjs(props.schedule.startTime).format("HH:mm");
  const endTime = () => dayjs(props.schedule.endTime).format("HH:mm");
  const [isOpen, setIsOpen] = createSignal(false);
  return (
    <>
      <FiEdit
        class="ml-2 cursor-pointer text-info"
        onClick={() => setIsOpen(true)}
      />

      <Modal isOpen={isOpen()} onClose={() => setIsOpen(false)}>
        <div class="flex">
          <input type="date" value={startDate().format("YYYY-MM-DD")} />
          <input type="time" value={startTime()} />
          <input type="time" value={endTime()} />
        </div>
      </Modal>
    </>
  );
};

export default EditJobScheduleButton;
