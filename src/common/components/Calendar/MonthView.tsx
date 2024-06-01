import CalendarDateCells from "./CalendarDateCells";
import CalendarDayInWeek from "./CalendarDayInWeek";

const MonthView = () => {
  return (
    <div class="grid grid-cols-7 gap-4 pt-4">
      <CalendarDayInWeek />
      <CalendarDateCells />
    </div>
  );
};

export default MonthView;
