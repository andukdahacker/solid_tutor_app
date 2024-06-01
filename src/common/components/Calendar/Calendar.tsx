import { CalendarProvider } from "./CalendarContext";
import CalendarHeader from "./CalendarHeader";
import CalendarView from "./CalendarView";

const Calendar = () => {
  return (
    <CalendarProvider>
      <div class="flex flex-col border p-6">
        <CalendarHeader />
        <CalendarView />
      </div>
    </CalendarProvider>
  );
};

export default Calendar;
