import { For, JSX, createEffect, createSignal, onMount } from "solid-js";
import { useCalendar } from "./CalendarContext";
import CalendarDateCell from "./CalendarDateCell";

const CalendarDateCells = () => {
  const { currentDateView } = useCalendar();
  const dateView = () => currentDateView();
  const monthStart = () => dateView().clone().startOf("month");
  const startDate = () => monthStart().clone().startOf("week");

  return (
    <>
      <For each={Array.from({ length: 35 }, (_, i) => i)}>
        {(day) => {
          const date = () => startDate().clone().add(day, "days");
          return <CalendarDateCell day={date()} />;
        }}
      </For>
    </>
  );
};

export default CalendarDateCells;
