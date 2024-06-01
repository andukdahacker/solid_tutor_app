import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

class DatetimeUtils {
  static ago(timestamp: number) {
    const timeAgo = dayjs(timestamp * 1000).toNow(true);

    return timeAgo;
  }

  static fromSeconds(seconds: number) {
    return new Date(seconds * 1000);
  }

  static formatYYYYMMDD(date: Date) {
    return dayjs(date).format("YYYY-MM-DD");
  }

  static contructStartEndDate(date: Date, startTime: string, endTime: string) {
    const convertedDate = dayjs(date);
    const year = convertedDate.year();
    const month = convertedDate.month();
    const day = convertedDate.date();

    const [startHour, startMin] = startTime.split(":").map(Number);

    const [endHour, endMin] = endTime.split(":").map(Number);

    const startDate = new Date(year, month, day, startHour, startMin);

    const endDate = new Date(year, month, day, endHour, endMin);

    return { startDate, endDate };
  }
}

export default DatetimeUtils;
