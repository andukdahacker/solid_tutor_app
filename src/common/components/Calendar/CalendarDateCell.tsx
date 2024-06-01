import dayjs from "dayjs";
import { Match, Switch, onMount } from "solid-js";
import { useCalendar } from "./CalendarContext";

interface CalendarDateCellProps {
  day: dayjs.Dayjs;
}

const CalendarDateCell = (props: CalendarDateCellProps) => {
  const { currentDateView, selectedDate, setSelectedDate } = useCalendar();

  const day = () => props.day;

  const isCurrentMonth = () => day().isSame(currentDateView(), "month");
  const isSelectedDate = () => day().isSame(selectedDate(), "day");

  return (
    <Switch>
      <Match when={isCurrentMonth()}>
        <div class={isSelectedDate() ? "bg-primary" : ""}>
          <div
            class="flex cursor-pointer justify-center"
            onClick={() => setSelectedDate(day())}
          >
            {day().date()}
          </div>
        </div>
      </Match>
      <Match when={!isCurrentMonth()}>
        <div class="flex justify-center text-neutral-content">
          {day().date()}
        </div>
      </Match>
    </Switch>
  );

  return;
};

export default CalendarDateCell;
