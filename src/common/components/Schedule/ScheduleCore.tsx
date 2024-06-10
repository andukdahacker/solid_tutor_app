import { For, JSX } from "solid-js";
import { TimeBlockSelectMode, useSchedule } from "./ScheduleProvider";
import ScheduleWeekColumnHeader from "./ScheduleWeekColumnHeader";
import ScheduleWeekColumn from "./ScheduleWeekColumn";
import { FiArrowLeft, FiArrowRight } from "solid-icons/fi";

const ScheduleCore = () => {
  const {
    next,
    prev,
    currentTime,
    setTimeBlockSelectMode,
    timeBlockSelectMode,
  } = useSchedule();

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
      <div class="flex w-full items-center justify-between p-4">
        <select class="select select-bordered select-sm">
          <option disabled>Duration</option>
          <For each={Object.values(TimeBlockSelectMode)}>
            {(value) => (
              <option
                onClick={() => {
                  setTimeBlockSelectMode(value);
                }}
                selected={value === timeBlockSelectMode()}
              >
                {value}
              </option>
            )}
          </For>
        </select>
        <div class="flex gap-4">
          <button class="btn btn-outline btn-sm" onClick={() => prev()}>
            <FiArrowLeft />
          </button>
          <button class="btn btn-outline btn-sm" onClick={() => next()}>
            <FiArrowRight />
          </button>
        </div>
      </div>
      <div class="grid grid-cols-7 bg-blue-200">{renderWeek()}</div>
      <ScheduleWeekColumn />
    </div>
  );
};

export default ScheduleCore;
