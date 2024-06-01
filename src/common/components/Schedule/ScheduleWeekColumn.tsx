import dayjs from "dayjs";
import { For, JSX, Show, createEffect, createSignal } from "solid-js";
import ScheduleDayColumn from "./ScheduleDayColumn";
import { useSchedule } from "./ScheduleProvider";
import { c } from "vite/dist/node/types.d-AKzkD8vd";
import Modal from "../Modal/Modal";

const ScheduleWeekColumn = () => {
  const {
    currentTime,
    firstSelectedDate,
    lastSelectedDate,
    firstSelectedIndex,
    lastSelectedIndex,
    setIsDragging,
    isDragging,
    setFirstSelectedDate,
    setFirstSelectedIndex,
    setLastSelectedDate,
    setLastSelectedIndex,
    setIsSelected,
    addSelectedTimeBlock,
    timeBlocks,
  } = useSchedule();

  const startOfWeek = () => currentTime().startOf("week");

  const renderDayColumns = () => {
    const grid: JSX.Element[] = [];

    for (let i = 0; i < 7; i++) {
      const day = startOfWeek().add(i, "day");

      const timeBlockInSameDay = () =>
        timeBlocks().filter((timeBlock) => timeBlock.start.isSame(day, "day"));

      const isSelectedTimeBlock = () => {
        if (!timeBlockInSameDay()) {
          return false;
        }

        return true;
      };

      const isFirstAfterLast = () => {
        if (firstSelectedDate() == null || lastSelectedDate() == null) {
          return false;
        }
        return firstSelectedDate()?.isAfter(lastSelectedDate());
      };

      grid.push(
        <div
          class="relative border"
          onDrop={(e) => {
            e.preventDefault();
            console.log("drop");
          }}
          onDragOver={(e) => {
            e.preventDefault();
            const containTimeSlot = e.target.classList.contains("timeslot");
            if (containTimeSlot) {
              const id = e.target.id;
              const splitted = id.split("_");
              const index = Number(splitted[0]);
              const selectedDate = dayjs(splitted[1]);

              console.log("dragover", selectedDate.format("HH:mm"));
            }
          }}
          onMouseDown={(e) => {
            const containTimeSlot = e.target.classList.contains("timeslot");

            if (containTimeSlot) {
              setIsDragging(true);
              setIsSelected(false);
              const id = e.target.id;
              const splitted = id.split("_");
              const index = Number(splitted[0]);
              const selectedDate = dayjs(splitted[1]);

              setFirstSelectedDate(selectedDate);
              setFirstSelectedIndex(index);
              setLastSelectedDate(selectedDate);
              setLastSelectedIndex(index);
            }
          }}
          onMouseMove={(e) => {
            console.log(e.target.id);
            if (isDragging()) {
              const containTimeSlot = e.target.classList.contains("timeslot");

              if (containTimeSlot) {
                const id = e.target.id;
                const splitted = id.split("_");
                const index = Number(splitted[0]);
                const selectedDate = dayjs(splitted[1]);
                const hour = selectedDate.hour();
                const minute = selectedDate.minute();

                const lastDate = firstSelectedDate()
                  ?.clone()
                  .hour(hour)
                  .minute(minute);

                setLastSelectedDate(lastDate!);
                setLastSelectedIndex(index);
              }
            }
          }}
          onMouseUp={(e) => {
            if (isDragging()) {
              setIsDragging(false);
              setIsSelected(true);

              const start = isFirstAfterLast()
                ? lastSelectedDate()
                : firstSelectedDate();
              const end = isFirstAfterLast()
                ? firstSelectedDate()
                : lastSelectedDate();
              const firstIndex = isFirstAfterLast()
                ? lastSelectedIndex()
                : firstSelectedIndex();
              const endIndex = isFirstAfterLast()
                ? firstSelectedIndex()
                : lastSelectedIndex();

              addSelectedTimeBlock({
                start: start!,
                end: end!,
                firstIndex: firstIndex!,
                lastIndex: endIndex!,
              });
            }
          }}
        >
          <ScheduleDayColumn day={day} />
          <For each={timeBlocks()}>
            {(timeBlock) => {
              const top = () => {
                if (timeBlock.firstIndex == 0) {
                  return "0px";
                }

                const topNum = timeBlock.firstIndex * 14;
                return `${topNum}px`;
              };

              const height = () => {
                const heightNum =
                  (timeBlock.lastIndex - timeBlock.firstIndex + 1) * 14;
                return `${heightNum}px`;
              };

              const timeBlockZIndex = () => {
                const largerTimeBlocks = timeBlockInSameDay().filter((e) => {
                  return (
                    e.start.isBefore(timeBlock.start) &&
                    e.end.isAfter(timeBlock.end)
                  );
                });

                return largerTimeBlocks.length + 1;
              };

              const largerTimeBlocks = () => {
                const blocks = timeBlockInSameDay().filter((e) => {
                  return (
                    (e.start.isBefore(timeBlock.start) &&
                      e.end.isAfter(timeBlock.end)) ||
                    (e.start.isAfter(timeBlock.start) &&
                      e.end.isBefore(timeBlock.end))
                  );
                });

                blocks.push(timeBlock);

                const sortedBlocks = blocks.sort((a, b) => {
                  if (a.start.isBefore(b.start)) {
                    return -1;
                  }
                  if (a.start.isAfter(b.start)) {
                    return 1;
                  }
                  return 0;
                });

                return sortedBlocks;
              };

              const currentTimeBlockIndexBetweenLargerTimeBlocks = () => {
                return largerTimeBlocks().indexOf(timeBlock);
              };

              const left = () => {
                if (largerTimeBlocks().length == 0) {
                  return "0%";
                }

                if (currentTimeBlockIndexBetweenLargerTimeBlocks() == 0) {
                  return "0%";
                }

                console.log(
                  "currentTimeBlockIndexBetweenLargerTimeBlocks()",
                  currentTimeBlockIndexBetweenLargerTimeBlocks(),
                );

                const leftNum =
                  100 / (currentTimeBlockIndexBetweenLargerTimeBlocks() + 1);

                console.log("leftNum", leftNum);

                return `${leftNum}%`;
              };

              const width = () => {
                if (largerTimeBlocks().length == 1) {
                  return "100%";
                }

                const widthNum = 100 / largerTimeBlocks().length;
                console.log("widthNum", widthNum);
                return `${widthNum}%`;
              };

              const overlapTimeBlocks = () => {
                return timeBlockInSameDay().filter((e) => {
                  const overlapAtStart =
                    e.start.isBefore(timeBlock.start) &&
                    e.end.isAfter(timeBlock.start);
                  const overlapAtEnd =
                    e.start.isBefore(timeBlock.end) &&
                    e.end.isAfter(timeBlock.end);

                  return overlapAtStart || overlapAtEnd;
                });
              };

              const dateSelectedText = () => {
                return `${timeBlock.start.format("HH:mm")} ~ ${timeBlock.end?.clone().add(15, "minute").format("HH:mm")}`;
              };

              const quarters = () => {
                return timeBlock.lastIndex - timeBlock.firstIndex + 1;
              };

              return (
                <Show when={timeBlock.start.isSame(day, "day")}>
                  <div
                    class={
                      isSelectedTimeBlock()
                        ? "absolute z-10 rounded-lg bg-primary drop-shadow-xl"
                        : "hidden"
                    }
                    style={{
                      top: top(),
                      left: left(),
                      height: height(),
                      width: width(),
                      "pointer-events": isDragging() ? "none" : "all",
                      opacity: isDragging() ? 0.5 : 1,
                    }}
                    draggable={true}
                    onDragStart={(e) => {
                      e.dataTransfer?.setDragImage(new Image(), 0, 0);
                    }}
                  >
                    <div class="absolute top-0 text-xs text-white">
                      {dateSelectedText()}
                    </div>
                  </div>
                </Show>
              );
            }}
          </For>
        </div>,
      );
    }

    return grid;
  };
  return (
    <>
      <div class="grid grid-cols-7 overflow-y-scroll">{renderDayColumns()}</div>
    </>
  );
};

export default ScheduleWeekColumn;
