import { For } from "solid-js";
import { useCalendar } from "./CalendarContext";
import dayjs from "dayjs";

const YearView = () => {
  const {
    setCurrentDateView,
    setCalendarView,
    currentDateView,
    currentYearView,
    selectedDate,
  } = useCalendar();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div class="grid grid-cols-4">
      <For each={months}>
        {(month) => {
          const isSelectedMonth = () =>
            month == selectedDate().format("MMM") &&
            currentYearView().toString() == selectedDate().format("YYYY");
          return (
            <div class={isSelectedMonth() ? "bg-primary" : ""}>
              <div
                class="flex cursor-pointer justify-center"
                onClick={() => {
                  setCurrentDateView(
                    currentDateView()
                      .clone()
                      .month(months.indexOf(month))
                      .year(currentYearView()),
                  );
                  setCalendarView("month");
                }}
              >
                {month}
              </div>
            </div>
          );
        }}
      </For>
    </div>
  );
};

export default YearView;
