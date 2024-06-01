import { Match, Switch } from "solid-js";
import { useCalendar } from "./CalendarContext";
import MonthView from "./MonthView";
import YearView from "./YearView";
import YearPeriodView from "./YearPeriodView";

const CalendarView = () => {
  const { calendarView } = useCalendar();
  return (
    <Switch>
      <Match when={calendarView() === "month"}>
        <MonthView />
      </Match>
      <Match when={calendarView() === "year"}>
        <YearView />
      </Match>
      <Match when={calendarView() === "century"}>
        <YearPeriodView />
      </Match>
    </Switch>
  );
};

export default CalendarView;
