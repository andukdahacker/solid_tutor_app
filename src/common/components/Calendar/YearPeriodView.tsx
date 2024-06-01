import { useCalendar } from "./CalendarContext";
import YearPeriodCell from "./YearPeriodCell";

const YearPeriodView = () => {
  const { yearPeriodStart, yearPeriodEnd } = useCalendar();
  const renderYears = () => {
    let year = yearPeriodStart();
    const components = [];
    while (year <= yearPeriodEnd()) {
      components.push(<YearPeriodCell year={year} />);
      year++;
    }

    return components;
  };

  return (
    <>
      <div class="grid grid-cols-4">{renderYears()}</div>
    </>
  );
};

export default YearPeriodView;
