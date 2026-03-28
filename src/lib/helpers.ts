import type { ApplicationStatus } from "../types";

export function formatDateOnly(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function formatDateTime(date: Date): string {
  return `${formatDateOnly(date)} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function getStatusClass(status: ApplicationStatus | "未投递"): string {
  if (status === "已提交" || status === "审核中") {
    return "status-review";
  }

  if (status === "一面" || status === "二面") {
    return "status-interview";
  }

  if (status === "已录取") {
    return "status-offer";
  }

  if (status === "婉拒") {
    return "status-reject";
  }

  return "";
}

function pad(value: number): string {
  return String(value).padStart(2, "0");
}
