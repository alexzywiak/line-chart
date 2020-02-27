import moment from "moment";

export enum MetricType {
  "PERCENTAGE",
  "SECONDS",
  "EVENT",
  "TIME_FRAME"
}

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

const toTimestamp = (n: number) =>
  moment()
    .subtract(n * 5, "minutes")
    .unix()
    .toString();

export default (n: number) => {
  const list = Array(n).fill(null);

  return {
    health_score: {
      type: MetricType.PERCENTAGE,
      data: list.map((_, idx) => ({
        timestamp: toTimestamp(n - idx),
        value: String(Math.random())
      }))
    },
    p50_request_duration_seconds: {
      type: MetricType.SECONDS,
      data: list.map((_, idx) => ({
        timestamp: toTimestamp(n - idx),
        value: String(rand(0.01, 1))
      }))
    }
  };
};

export const getConfigEvents = (n: number) => {
  const list = Array(n).fill(null);
  return {
    type: MetricType.EVENT,
    data: list
      .map((_, idx) => ({
        timestamp: toTimestamp(n - idx)
      }))
      .filter(() => (Math.random() > 0.85 ? true : false))
  };
};

export const getBands = (n: number) => {
  return {
    type: MetricType.TIME_FRAME,
    data: Array(Math.floor(n / 8))
      .fill(null)
      .map((_, idx) => {
        const end = Math.floor(rand((idx + 1) * 6, (idx + 1) * 7));
        const start = Math.floor(rand(end + 1, (idx + 1) * 8));
        return { start: toTimestamp(start), end: toTimestamp(end) };
      })
  };
};
