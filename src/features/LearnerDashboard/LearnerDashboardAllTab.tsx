import { createSignal } from "solid-js";
import Calendar from "../../common/components/Calendar/Calendar";
import CalendarModal from "../../common/components/Calendar/CalendarModal";
import UpcomingLessonTable from "./UpcomingLessonTable";
import RecentTutorApplications from "./RecentTutorApplications";
import LearnerJobRequestList from "./LearnerJobRequestList";

const LearnerDashboardAllTab = () => {
  const [calendarDate, setCalendarDate] = createSignal(new Date());
  return (
    <div class="flex w-full flex-col items-start justify-center gap-6">
      <div class="flex w-full flex-col gap-6 sm:flex-row">
        <div class="flex items-center justify-center sm:hidden">
          <CalendarModal
            initialDate={calendarDate()}
            onSelectDate={(date) => {
              setCalendarDate(date);
            }}
          />
        </div>
        <div class="hidden h-96 w-2/5 sm:block">
          <Calendar initialDate={calendarDate()} onSelectDate={(date) => {}} />
        </div>

        <div class="flex h-96 w-full flex-col items-start justify-start gap-2 sm:w-3/5">
          <span class="text-xl font-bold">Upcoming lessons</span>
          <UpcomingLessonTable />
        </div>
      </div>

      <div class="flex w-full flex-col items-start justify-center gap-2">
        <span class="text-xl font-bold">New tutor requests</span>
        <div class="w-full">
          <RecentTutorApplications />
        </div>
      </div>

      <div class="flex w-full flex-col items-start justify-center gap-2">
        <span class="text-xl font-bold">Your requests</span>
        <LearnerJobRequestList />
      </div>
    </div>
  );
};

export default LearnerDashboardAllTab;
