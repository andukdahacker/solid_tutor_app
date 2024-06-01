import dayjs from "dayjs";
import Calendar from "../common/components/Calendar/Calendar";
import Schedule from "../common/components/Schedule/Schedule";

const LearnerDashboard = () => {
  return (
    <>
      Learner Dashboard
      <div>
        <Calendar />

        <Schedule initialTime={dayjs()} />
      </div>
    </>
  );
};

export default LearnerDashboard;
