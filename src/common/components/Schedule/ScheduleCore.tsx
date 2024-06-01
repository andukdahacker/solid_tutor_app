import { JSX } from "solid-js";
import { useSchedule } from "./ScheduleProvider";
import ScheduleWeekColumnHeader from "./ScheduleWeekColumnHeader";
import ScheduleWeekColumn from "./ScheduleWeekColumn";
import { FiArrowLeft, FiArrowRight } from "solid-icons/fi";

const ScheduleCore = () => {
  const { next, prev, currentTime } = useSchedule();

  const startOfWeek = () => currentTime().startOf("week");

  const renderWeek = () => {
    const row: JSX.Element[] = [];
    for (let i = 0; i < 7; i++) {
      const day = startOfWeek().add(i, "day");
      row.push(<ScheduleWeekColumnHeader day={day} />);
    }

    return row;
  };

  return (
    <div class="flex max-h-dvh w-full flex-col">
      <div>
        <button class="btn btn-outline" onClick={() => prev()}>
          <FiArrowLeft />
        </button>
        <button class="btn btn-outline" onClick={() => next()}>
          <FiArrowRight />
        </button>
      </div>
      <div class="grid grid-cols-7 bg-blue-200">{renderWeek()}</div>
      <ScheduleWeekColumn />
    </div>
  );
};

export default ScheduleCore;
