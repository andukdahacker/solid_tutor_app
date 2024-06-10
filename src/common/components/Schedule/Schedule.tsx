import dayjs from "dayjs";
import ScheduleCore from "./ScheduleCore";
import { ITimeBlock, ScheduleProvider } from "./ScheduleProvider";

interface IScheduleProps {
  initialTime: dayjs.Dayjs;
  onUpdateTimeBlocks: (timeBlock: ITimeBlock[]) => void;
}

const Schedule = (props: IScheduleProps) => {
  return (
    <ScheduleProvider
      defaultTime={props.initialTime}
      onUpdateTimeBlocks={props.onUpdateTimeBlocks}
    >
      <ScheduleCore />
    </ScheduleProvider>
  );
};

export default Schedule;
