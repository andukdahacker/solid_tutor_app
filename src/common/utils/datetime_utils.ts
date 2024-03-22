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
}

export default DatetimeUtils;
