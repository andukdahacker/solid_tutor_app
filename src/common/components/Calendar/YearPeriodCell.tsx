import { useCalendar } from "./CalendarContext";

interface YearPeriodCellProps {
  year: number;
}

const YearPeriodCell = (props: YearPeriodCellProps) => {
  const { setCurrentYearView, setCalendarView, selectedDate } = useCalendar();
  const isSelected = () => props.year == selectedDate().year();
  return (
    <div class={isSelected() ? "bg-primary" : ""}>
      <div
        class="flex cursor-pointer justify-center"
        onClick={() => {
          setCurrentYearView(props.year);
          setCalendarView("year");
        }}
      >
        {props.year}
      </div>
    </div>
  );
};
export default YearPeriodCell;
