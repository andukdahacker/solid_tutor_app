import dayjs from "dayjs";
import { TimeBlockSelectModeType, useSchedule } from "./ScheduleProvider";
import { Match, Show, Switch } from "solid-js";

interface IScheduleQuarterProps {
  day: dayjs.Dayjs;
  quarterIndex: number;
  hourIndex: number;
}

const ScheduleQuarter = (props: IScheduleQuarterProps) => {
  const {
    timeBlockSelectMode,
    addSelectedTimeBlock,
    setDraggingTimeBlock,
    dragged,
    setDragged,
  } = useSchedule();

  const handleClick = () => {
    switch (timeBlockSelectMode()) {
      case "30min":
        addSelectedTimeBlock({
          start: props.day,
          end: props.day.add(30, "minutes"),
          firstIndex: props.quarterIndex + props.hourIndex * 4,
          lastIndex: props.quarterIndex + props.hourIndex * 4 + 1,
        });
        break;
      case "45min":
        addSelectedTimeBlock({
          start: props.day,
          end: props.day.add(45, "minutes"),
          firstIndex: props.quarterIndex + props.hourIndex * 4,
          lastIndex: props.quarterIndex + props.hourIndex * 4 + 2,
        });
        break;
      case "60min":
        addSelectedTimeBlock({
          start: props.day,
          end: props.day.add(60, "minutes"),
          firstIndex: props.quarterIndex + props.hourIndex * 4,
          lastIndex: props.quarterIndex + props.hourIndex * 4 + 3,
        });
        break;
      case "90min":
        addSelectedTimeBlock({
          start: props.day,
          end: props.day.add(90, "minutes"),
          firstIndex: props.quarterIndex + props.hourIndex * 4,
          lastIndex: props.quarterIndex + props.hourIndex * 4 + 5,
        });
        break;
      case "120min":
        addSelectedTimeBlock({
          start: props.day,
          end: props.day.add(120, "minutes"),
          firstIndex: props.quarterIndex + props.hourIndex * 4,
          lastIndex: props.quarterIndex + props.hourIndex * 4 + 7,
        });
        break;
      case "240min":
        addSelectedTimeBlock({
          start: props.day,
          end: props.day.add(240, "minutes"),
          firstIndex: props.quarterIndex + props.hourIndex * 4,
          lastIndex: props.quarterIndex + props.hourIndex * 4 + 15,
        });
        break;
      default:
        break;
    }
  };

  const handleDragOver = (timeBlockSelectMode: TimeBlockSelectModeType) => {
    switch (timeBlockSelectMode) {
      case "30min":
        setDraggingTimeBlock({
          start: props.day,
          end: props.day.add(30, "minutes"),
          firstIndex: props.quarterIndex + props.hourIndex * 4,
          lastIndex: props.quarterIndex + props.hourIndex * 4 + 1,
        });
        break;
      case "45min":
        setDraggingTimeBlock({
          start: props.day,
          end: props.day.add(45, "minutes"),
          firstIndex: props.quarterIndex + props.hourIndex * 4,
          lastIndex: props.quarterIndex + props.hourIndex * 4 + 2,
        });
        break;
      case "60min":
        setDraggingTimeBlock({
          start: props.day,
          end: props.day.add(60, "minutes"),
          firstIndex: props.quarterIndex + props.hourIndex * 4,
          lastIndex: props.quarterIndex + props.hourIndex * 4 + 3,
        });
        break;
      case "90min":
        setDraggingTimeBlock({
          start: props.day,
          end: props.day.add(90, "minutes"),
          firstIndex: props.quarterIndex + props.hourIndex * 4,
          lastIndex: props.quarterIndex + props.hourIndex * 4 + 5,
        });
        break;
      case "120min":
        setDraggingTimeBlock({
          start: props.day,
          end: props.day.add(120, "minutes"),
          firstIndex: props.quarterIndex + props.hourIndex * 4,
          lastIndex: props.quarterIndex + props.hourIndex * 4 + 7,
        });
        break;
      case "240min":
        setDraggingTimeBlock({
          start: props.day,
          end: props.day.add(240, "minutes"),
          firstIndex: props.quarterIndex + props.hourIndex * 4,
          lastIndex: props.quarterIndex + props.hourIndex * 4 + 15,
        });
        break;
      default:
        break;
    }
  };

  return (
    <div
      class="h-[14px] w-full"
      onClick={() => {
        handleClick();
      }}
      onDragOver={(e) => {
        e.preventDefault();
        const type = dragged()?.end.diff(dragged()?.start, "minutes");
        console.log("dragover", type);
        handleDragOver(`${type}min` as TimeBlockSelectModeType);
      }}
    ></div>
  );
};

export default ScheduleQuarter;
