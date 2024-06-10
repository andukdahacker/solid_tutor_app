import dayjs from "dayjs";
import { createSignal } from "solid-js";
import Modal from "../Modal/Modal";
import Calendar from "./Calendar";
import { FiCalendar } from "solid-icons/fi";

interface CalendarModalProps {
  initialDate: Date;
  onSelectDate: (date: Date) => void;
}

const CalendarModal = (props: CalendarModalProps) => {
  const [date, setDate] = createSignal(props.initialDate);
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <>
      <div
        class="flex w-full max-w-md cursor-pointer flex-row items-center justify-center gap-4 rounded-md border p-2"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <div>{dayjs(props.initialDate).format("DD-MM-YYYY")}</div>
        <FiCalendar />
      </div>

      <Modal isOpen={isOpen()} onClose={() => setIsOpen(false)}>
        <div class="flex flex-col">
          <Calendar
            initialDate={props.initialDate}
            onSelectDate={(date) => {
              setDate(date);
            }}
          />
          <div class="flex flex-row items-center justify-end gap-4">
            <button class="btn btn-outline" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
            <button
              class="btn btn-primary"
              onClick={() => {
                props.onSelectDate(date());
                setIsOpen(false);
              }}
            >
              Select
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CalendarModal;
