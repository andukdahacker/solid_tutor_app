import dayjs from "dayjs";
import {
  Accessor,
  ParentProps,
  createContext,
  createEffect,
  createSignal,
  useContext,
} from "solid-js";

interface ScheduleProviderProps {
  defaultTime: dayjs.Dayjs;
  onUpdateTimeBlocks: (timeBlock: ITimeBlock[]) => void;
}

export const TimeBlockSelectMode = {
  30: "30min",
  45: "45min",
  60: "60min",
  90: "90min",
  120: "120min",
  240: "240min",
  480: "480min",
} as const;

export type TimeBlockSelectModeType =
  (typeof TimeBlockSelectMode)[keyof typeof TimeBlockSelectMode];

interface IScheduleContext {
  currentTime: Accessor<dayjs.Dayjs>;
  next: () => void;
  prev: () => void;
  timeBlockSelectMode: Accessor<TimeBlockSelectModeType>;
  setTimeBlockSelectMode: (mode: TimeBlockSelectModeType) => void;
  timeBlocks: Accessor<ITimeBlock[]>;
  setTimeBlocks: (timeBlocks: ITimeBlock[]) => void;
  addSelectedTimeBlock: (timeBlock: ITimeBlock) => void;
  removeSelectedTimeBlock: (timeBlock: ITimeBlock) => void;
  isDragging: Accessor<boolean>;
  setIsDragging: (isDragging: boolean) => void;
  draggingTimeBlock: Accessor<ITimeBlock | undefined>;
  setDraggingTimeBlock: (timeBlock: ITimeBlock | undefined) => void;
  dragged: Accessor<ITimeBlock | undefined>;
  setDragged: (timeBlock: ITimeBlock | undefined) => void;
}

export interface ITimeBlock {
  start: dayjs.Dayjs;
  end: dayjs.Dayjs;
  firstIndex: number;
  lastIndex: number;
}

const ScheduleContext = createContext<IScheduleContext>();

const ScheduleProvider = (props: ParentProps<ScheduleProviderProps>) => {
  const [currentTime, setCurrentTime] = createSignal(props.defaultTime);
  const [timeBlockSelectMode, setTimeBlockSelectMode] =
    createSignal<TimeBlockSelectModeType>("30min");
  const [timeBlocks, setTimeBlocks] = createSignal<ITimeBlock[]>([]);
  const [isDragging, setIsDragging] = createSignal(false);
  const [dragged, setDragged] = createSignal<ITimeBlock>();
  const [draggingTimeBlock, setDraggingTimeBlock] = createSignal<ITimeBlock>();

  const next = () => {
    setCurrentTime(currentTime().add(7, "days"));
  };

  const prev = () => {
    setCurrentTime(currentTime().subtract(7, "days"));
  };

  const addSelectedTimeBlock = (timeBlock: ITimeBlock) => {
    setTimeBlocks((prev) => {
      if (!prev) return prev;
      return [...prev, timeBlock];
    });
  };

  const removeSelectedTimeBlock = (timeBlock: ITimeBlock) => {
    setTimeBlocks((prev) => {
      if (!prev) return prev;
      return prev.filter((block) => block !== timeBlock);
    });
  };

  createEffect(() => {
    props.onUpdateTimeBlocks(timeBlocks());
  });

  return (
    <ScheduleContext.Provider
      value={{
        currentTime,
        next,
        prev,
        timeBlockSelectMode,
        setTimeBlockSelectMode,
        timeBlocks,
        setTimeBlocks,
        addSelectedTimeBlock,
        removeSelectedTimeBlock,
        isDragging,
        setIsDragging,
        draggingTimeBlock,
        setDraggingTimeBlock,
        dragged,
        setDragged,
      }}
    >
      {props.children}
    </ScheduleContext.Provider>
  );
};

function useSchedule() {
  const value = useContext(ScheduleContext);

  if (!value) throw new Error("Cannot find ScheduleContext");

  return value;
}

export { ScheduleProvider, useSchedule };
