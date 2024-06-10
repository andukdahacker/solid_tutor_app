import dayjs from "dayjs";
import { For, JSX, Show } from "solid-js";
import ScheduleDayColumn from "./ScheduleDayColumn";
import { useSchedule } from "./ScheduleProvider";

const ScheduleWeekColumn = () => {
  const {
    currentTime,
    addSelectedTimeBlock,
    timeBlocks,
    isDragging,
    setIsDragging,
    removeSelectedTimeBlock,
    draggingTimeBlock,
    setDraggingTimeBlock,
    setDragged,
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

      const draggingTop = () => {
        if (!draggingTimeBlock()) {
          return "0px";
        }

        const topNum = draggingTimeBlock()!.firstIndex * 14;
        return `${topNum}px`;
      };

      const draggingHeight = () => {
        if (!draggingTimeBlock()) {
          return "0px";
        }

        const heightNum =
          (draggingTimeBlock()!.lastIndex -
            draggingTimeBlock()!.firstIndex +
            1) *
          14;
        return `${heightNum}px`;
      };

      const draggingText = () => {
        if (!draggingTimeBlock()) {
          return "";
        }

        return `${draggingTimeBlock()!.start.format("HH:mm")} - ${draggingTimeBlock()!.end.format("HH:mm")}`;
      };

      grid.push(
        <div class="relative border">
          <ScheduleDayColumn day={day} />
          <Show when={draggingTimeBlock()?.start.isSame(day, "day")}>
            <div
              class={
                "absolute z-10 w-full rounded-lg bg-primary drop-shadow-xl"
              }
              style={{
                top: draggingTop(),
                height: draggingHeight(),
                "pointer-events": "none",
              }}
            >
              <div class="absolute top-0 text-xs text-white">
                {draggingText()}
              </div>
            </div>
          </Show>
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
              const dateSelectedText = () => {
                return `${timeBlock.start.format("HH:mm")} ~ ${timeBlock.end?.format("HH:mm")}`;
              };

              const timeOverlaps = () => {
                const overlappingTimeBlocks = timeBlockInSameDay().filter(
                  (e) => {
                    const isAfterAndBefore =
                      e.start.isAfter(timeBlock.start) &&
                      e.end.isBefore(timeBlock.end);
                    const isBeforeAndAfter =
                      e.start.isBefore(timeBlock.start) &&
                      e.end.isAfter(timeBlock.end);

                    return isAfterAndBefore || isBeforeAndAfter;
                  },
                );

                overlappingTimeBlocks.push(timeBlock);

                const sortedOverlappingTimeBlocks = overlappingTimeBlocks.sort(
                  (a, b) => {
                    return a.start.valueOf() - b.start.valueOf();
                  },
                );

                return sortedOverlappingTimeBlocks;
              };

              const width = () => {
                const widthNum = 100 / timeOverlaps().length;
                return `${widthNum}%`;
              };

              const left = () => {
                const leftNum =
                  (timeOverlaps().indexOf(timeBlock) * 100) /
                  timeOverlaps().length;
                return `${leftNum}%`;
              };

              return (
                <Show when={timeBlock.start.isSame(day, "day")}>
                  <div
                    class={
                      isSelectedTimeBlock()
                        ? "absolute z-10 w-full rounded-lg bg-primary drop-shadow-xl"
                        : "hidden"
                    }
                    style={{
                      top: top(),
                      height: height(),
                      width: width(),
                      left: left(),
                      opacity: isDragging() ? "0.5" : "1",
                      "pointer-events": isDragging() ? "none" : "auto",
                    }}
                    draggable={true}
                    onDragStart={(e) => {
                      e.dataTransfer?.setDragImage(new Image(), 0, 0);
                      setDragged(timeBlock);
                      setIsDragging(true);
                    }}
                    onDragEnd={() => {
                      setIsDragging(false);
                      const newTimeBlock = () => draggingTimeBlock();
                      addSelectedTimeBlock(newTimeBlock()!);
                      setDraggingTimeBlock(undefined);
                      removeSelectedTimeBlock(timeBlock);
                    }}
                  >
                    <div
                      class="absolute right-3 top-0 cursor-pointer text-white"
                      onClick={() => {
                        removeSelectedTimeBlock(timeBlock);
                      }}
                    >
                      x
                    </div>
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
