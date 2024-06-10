import { CalendarProvider } from "./CalendarContext";
import CalendarHeader from "./CalendarHeader";
import CalendarView from "./CalendarView";

interface CalendarProps {
  initialDate?: Date;
  onSelectDate: (date: Date) => void;
}

const Calendar = (props: CalendarProps) => {
  return (
    <CalendarProvider
      initialDate={props.initialDate}
      onSelectDate={props.onSelectDate}
    >
      <div class="flex h-full max-h-96 flex-col border p-6">
        <CalendarHeader />
        <CalendarView />
      </div>
    </CalendarProvider>
  );
};

export default Calendar;
