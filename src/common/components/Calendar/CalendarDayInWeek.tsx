import { For } from "solid-js";

const CalendarDayInWeek = () => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <For each={weekdays}>
      {(day) => <div class="flex justify-center">{day}</div>}
    </For>
  );
};

export default CalendarDayInWeek;
