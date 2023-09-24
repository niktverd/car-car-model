import { PlanName } from "./plan";
import { Report } from "./report";

export const wrapper = (report: Report, callback: (key: PlanName) => void) => {
    const keys = Object.keys(report) as PlanName[];

    keys.filter((key) => key !== PlanName.Total).forEach(callback);
};
