import dayjs from "dayjs";
import { JSX } from "solid-js";

interface IScheduleDayColumnProps {
  day: dayjs.Dayjs;
}

const ScheduleWeekColumnHeader = (props: IScheduleDayColumnProps) => {
  return (
    <div class="flex max-h-lvh w-full flex-col items-center justify-center overflow-auto">
      <div class="sticky top-0 flex flex-col items-center justify-center">
        <div>{props.day.format("ddd")}</div>
        <div>{props.day.date()}</div>
      </div>
    </div>
  );
};

export default ScheduleWeekColumnHeader;
