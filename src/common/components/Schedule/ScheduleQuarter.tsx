import dayjs from "dayjs";
import { useSchedule } from "./ScheduleProvider";
import { Match, Show, Switch } from "solid-js";

interface IScheduleQuarterProps {
  day: dayjs.Dayjs;
  quarterIndex: number;
  hourIndex: number;
}

const ScheduleQuarter = (props: IScheduleQuarterProps) => {
  const { firstSelectedDate, lastSelectedDate, isSelected } = useSchedule();
  const firstIsAfterLast = () => {
    if (firstSelectedDate() == null || lastSelectedDate() == null) {
      return false;
    }
    return firstSelectedDate()?.isAfter(lastSelectedDate());
  };
  const isFirstSelected = () => {
    if (firstSelectedDate() == null) {
      return false;
    }

    if (firstIsAfterLast()) {
      return props.day.isSame(lastSelectedDate());
    }

    return props.day.isSame(firstSelectedDate());
  };

  const isLastSelected = () => {
    if (lastSelectedDate() == null) {
      return false;
    }

    if (firstIsAfterLast()) {
      return props.day.isSame(firstSelectedDate());
    }

    return props.day.isSame(lastSelectedDate());
  };

  const isBetweenSelected = () => {
    if (firstSelectedDate() == null || lastSelectedDate() == null) {
      return false;
    }

    if (firstIsAfterLast()) {
      return (
        props.day.isBefore(firstSelectedDate()) &&
        props.day.isAfter(lastSelectedDate())
      );
    } else {
      return (
        props.day.isAfter(firstSelectedDate()) &&
        props.day.isBefore(lastSelectedDate())
      );
    }
  };

  const isSelectedDay = () =>
    isFirstSelected() || isLastSelected() || isBetweenSelected();

  return (
    <div class={"relative z-0 h-[14px] w-full"}>
      <div
        class="timeslot absolute z-50 h-[14px] w-full bg-transparent"
        style={{
          "border-top-left-radius": isFirstSelected() ? "4px" : "0px",
          "border-top-right-radius": isFirstSelected() ? "4px" : "0px",
          "border-bottom-left-radius": isLastSelected() ? "4px" : "0px",
          "border-bottom-right-radius": isLastSelected() ? "4px" : "0px",
        }}
        id={
          (props.quarterIndex + props.hourIndex * 4).toString() +
          "_" +
          props.day.toISOString()
        }
      ></div>
      <Show when={isSelectedDay() && !isSelected()}>
        <div class="absolute z-40 h-[14px] w-full bg-primary"></div>
      </Show>
    </div>
  );
};

export default ScheduleQuarter;
