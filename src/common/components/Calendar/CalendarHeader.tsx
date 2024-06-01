import { FiChevronLeft, FiChevronRight } from "solid-icons/fi";
import { useCalendar } from "./CalendarContext";
import { Match, Switch } from "solid-js";
import dayjs from "dayjs";

const CalendarHeader = () => {
  const {
    currentDateView,
    calendarView,
    next,
    prev,
    changeCalendarView,
    currentYearView,
    yearPeriodStart,
    yearPeriodEnd,
  } = useCalendar();

  return (
    <div class="flex flex-row items-center justify-center">
      <div
        class="cursor-pointer border p-2"
        onClick={() => changeCalendarView()}
      >
        <Switch>
          <Match when={calendarView() === "month"}>
            <div>{currentDateView().format("MMMM YYYY")}</div>
          </Match>
          <Match when={calendarView() === "year"}>
            <div>{currentYearView()}</div>
          </Match>
          <Match when={calendarView() === "century"}>
            <div>
              {yearPeriodStart()} - {yearPeriodEnd()}
            </div>
          </Match>
        </Switch>
      </div>
      <div class="grow"></div>
      <div class="flex flex-row gap-4">
        <button class="btn btn-outline" onClick={() => prev()}>
          <FiChevronLeft />
        </button>
        <button class="btn btn-outline" onClick={() => next()}>
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
