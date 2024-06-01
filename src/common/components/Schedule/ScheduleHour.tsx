import dayjs from "dayjs";
import { JSX, onMount } from "solid-js";
import ScheduleQuarter from "./ScheduleQuarter";

interface IScheduleHourProps {
  day: dayjs.Dayjs;
  index: number;
}

const ScheduleHour = (props: IScheduleHourProps) => {
  const renderQuarter = () => {
    const column: JSX.Element[] = [];

    for (let i = 0; i < 4; i++) {
      const dayWithMinutes = () => props.day.set("minute", i * 15);
      column.push(
        <ScheduleQuarter
          day={dayWithMinutes()}
          quarterIndex={i}
          hourIndex={props.index}
        />,
      );
    }

    return column;
  };
  return <div class="flex flex-col">{renderQuarter()}</div>;
};

export default ScheduleHour;
