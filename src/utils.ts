import { PlanName } from "./plan";
import { Report } from "./report";

export const wrapper = (report: Report, callback: (key: PlanName) => void) => {
    const keys = Object.keys(report) as PlanName[];

    keys.forEach(callback);
};

export function flattenObject(obj: Object, prefix = '', result: Partial<Record<string, any>> = {}) {
    Object.entries(obj).forEach(([key, val]) => {
        const newKey = prefix ? `${prefix}.${key}` : key;
        if (val && typeof val === "object")
            return flattenObject(val, newKey, result);
        else
            result[newKey] = val;
    });

    return result;
  }
