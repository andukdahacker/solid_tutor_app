import dayjs from "dayjs";
import {
  Accessor,
  ParentProps,
  createContext,
  createEffect,
  createSignal,
  useContext,
} from "solid-js";
import { unwrap } from "solid-js/store";
import { i } from "vite/dist/node/types.d-AKzkD8vd";

type CalendarView = "month" | "year" | "century";

interface ICalendarContext {
  calendarView: Accessor<CalendarView>;
  setCalendarView: (view: CalendarView) => void;
  selectedDate: Accessor<dayjs.Dayjs>;
  setSelectedDate: (date: dayjs.Dayjs) => void;
  currentDateView: Accessor<dayjs.Dayjs>;
  setCurrentDateView: (date: dayjs.Dayjs) => void;
  currentYearView: Accessor<number>;
  setCurrentYearView: (year: number) => void;
  changeCalendarView: () => void;
  yearPeriodStart: Accessor<number>;
  setYearPeriodStart: (year: number) => void;
  yearPeriodEnd: Accessor<number>;
  setYearPeriodEnd: (year: number) => void;
  next: () => void;
  prev: () => void;
}

const CalendarContext = createContext<ICalendarContext>();

const CalendarProvider = (props: ParentProps) => {
  const [calendarView, setCalendarView] = createSignal<CalendarView>("month");
  const [selectedDate, setSelectedDate] = createSignal(dayjs());
  const [currentDateView, setCurrentDateView] = createSignal(dayjs());
  const [currentYearView, setCurrentYearView] = createSignal(dayjs().year());
  const [yearPeriodStart, setYearPeriodStart] = createSignal(
    dayjs().subtract(23, "years").year(),
  );
  const [yearPeriodEnd, setYearPeriodEnd] = createSignal(dayjs().year());

  const nextMonth = () => {
    setCurrentDateView(currentDateView().clone().add(1, "month"));
  };

  const prevMonth = () => {
    setCurrentDateView(currentDateView().clone().subtract(1, "month"));
  };

  const nextYear = () => {
    const yearView = currentYearView() + 1;
    setCurrentYearView(yearView);
  };

  const prevYear = () => {
    if (currentYearView() - 1 > 1970) {
      const yearView = currentYearView() - 1;
      setCurrentYearView(yearView);
    }
  };

  const nextPeriod = () => {
    const oldYearEnd = unwrap(yearPeriodEnd());
    setYearPeriodStart((_) => oldYearEnd + 1);
    setYearPeriodEnd((periodEnd) => periodEnd + 24);
  };

  const prevPeriod = () => {
    if (yearPeriodStart() == 1970) return;
    if (yearPeriodStart() - 24 >= 1970) {
      const oldYearStart = unwrap(yearPeriodStart());
      setYearPeriodStart((periodStart) => periodStart - 24);
      setYearPeriodEnd((_) => oldYearStart - 1);
    } else {
      const oldYearStart = unwrap(yearPeriodStart());
      setYearPeriodEnd(oldYearStart - 1);
      setYearPeriodStart(1970);
    }
  };

  const changeCalendarView = () => {
    switch (calendarView()) {
      case "month":
        setCalendarView("year");
        break;
      case "year":
        setCalendarView("century");
        break;
      case "century":
        setCalendarView("month");
        break;
    }
  };

  const next = () => {
    switch (calendarView()) {
      case "month":
        nextMonth();
        break;
      case "year":
        nextYear();
        break;
      case "century":
        nextPeriod();
        break;
    }
  };

  const prev = () => {
    switch (calendarView()) {
      case "month":
        prevMonth();
        break;
      case "year":
        prevYear();
        break;
      case "century":
        prevPeriod();
        break;
    }
  };

  return (
    <CalendarContext.Provider
      value={{
        calendarView,
        setCalendarView,
        selectedDate,
        setSelectedDate,
        currentDateView,
        setCurrentDateView,
        changeCalendarView,
        currentYearView,
        setCurrentYearView,
        yearPeriodStart,
        setYearPeriodStart,
        yearPeriodEnd,
        setYearPeriodEnd,
        next,
        prev,
      }}
    >
      {props.children}
    </CalendarContext.Provider>
  );
};

const useCalendar = () => {
  const value = useContext(CalendarContext);

  if (!value) throw new Error("Cannot find CalendarContext");

  return value;
};

export { CalendarContext, CalendarProvider, useCalendar };
