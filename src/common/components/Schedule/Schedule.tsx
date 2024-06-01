import dayjs from "dayjs";
import ScheduleCore from "./ScheduleCore";
import { ScheduleProvider } from "./ScheduleProvider";

interface IScheduleProps {
  initialTime: dayjs.Dayjs;
}

const Schedule = (props: IScheduleProps) => {
  return (
    <ScheduleProvider defaultTime={props.initialTime}>
      <ScheduleCore />
    </ScheduleProvider>
  );
};

export default Schedule;
