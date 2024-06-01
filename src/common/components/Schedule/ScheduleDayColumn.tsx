import dayjs from "dayjs";
import { JSX } from "solid-js";
import ScheduleHour from "./ScheduleHour";
import { useSchedule } from "./ScheduleProvider";

interface IScheduleHourProps {
  day: dayjs.Dayjs;
}

const ScheduleDayColumn = (props: IScheduleHourProps) => {
  const renderHours = () => {
    const column: JSX.Element[] = [];

    for (let i = 0; i < 24; i++) {
      const day = () => props.day.set("hour", i);
      column.push(
        <div class="h-[56px] border-b border-t">
          <ScheduleHour day={day()} index={i} />
        </div>,
      );
    }

    return column;
  };

  return <div>{renderHours()}</div>;
};

export default ScheduleDayColumn;
