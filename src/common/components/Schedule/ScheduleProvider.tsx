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
}

interface IScheduleContext {
  currentTime: Accessor<dayjs.Dayjs>;
  next: () => void;
  prev: () => void;
  firstSelectedDate: Accessor<dayjs.Dayjs | null>;
  setFirstSelectedDate: (date: dayjs.Dayjs | null) => void;
  lastSelectedDate: Accessor<dayjs.Dayjs | null>;
  setLastSelectedDate: (date: dayjs.Dayjs | null) => void;
  firstSelectedIndex: Accessor<number | null>;
  setFirstSelectedIndex: (index: number | null) => void;
  lastSelectedIndex: Accessor<number | null>;
  setLastSelectedIndex: (index: number | null) => void;
  isDragging: Accessor<boolean>;
  setIsDragging: (isDragging: boolean) => void;
  isSelected: Accessor<boolean>;
  setIsSelected: (isSelected: boolean) => void;
  timeBlocks: Accessor<ITimeBlock[]>;
  setTimeBlocks: (timeBlocks: ITimeBlock[]) => void;
  addSelectedTimeBlock: (timeBlock: ITimeBlock) => void;
  removeSelectedTimeBlock: (timeBlock: ITimeBlock) => void;
}

interface ITimeBlock {
  start: dayjs.Dayjs;
  end: dayjs.Dayjs;
  firstIndex: number;
  lastIndex: number;
}

const ScheduleContext = createContext<IScheduleContext>();

const ScheduleProvider = (props: ParentProps<ScheduleProviderProps>) => {
  const [currentTime, setCurrentTime] = createSignal(props.defaultTime);

  const [firstSelectedDate, setFirstSelectedDate] =
    createSignal<dayjs.Dayjs | null>(null);
  const [lastSelectedDate, setLastSelectedDate] =
    createSignal<dayjs.Dayjs | null>(null);

  const [firstSelectedIndex, setFirstSelectedIndex] = createSignal<
    number | null
  >(null);
  const [lastSelectedIndex, setLastSelectedIndex] = createSignal<number | null>(
    null,
  );

  const [timeBlocks, setTimeBlocks] = createSignal<ITimeBlock[]>([]);

  const [isDragging, setIsDragging] = createSignal(false);

  const [isSelected, setIsSelected] = createSignal(false);

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

  return (
    <ScheduleContext.Provider
      value={{
        currentTime,
        next,
        prev,
        firstSelectedDate,
        setFirstSelectedDate,
        lastSelectedDate,
        setLastSelectedDate,
        firstSelectedIndex,
        setFirstSelectedIndex,
        lastSelectedIndex,
        setLastSelectedIndex,
        isDragging,
        setIsDragging,
        isSelected,
        setIsSelected,
        timeBlocks,
        setTimeBlocks,
        addSelectedTimeBlock,
        removeSelectedTimeBlock,
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
