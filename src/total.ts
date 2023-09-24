import { PlanName } from "./plan";
import { PlanReport, Report } from "./report"
import { wrapper } from "./utils";

type CalculateTotalArgs = {
    report: Report;
};

export const calculateTotal = ({report}: CalculateTotalArgs) => {
    wrapper(report, (key: PlanName) => {
        const planReport = report[key];
        const reportKeys = Object.keys(planReport) as (keyof PlanReport)[];

        reportKeys.forEach((reportKey) => {
            if (reportKey === 'team') {
                return;
            }

            if (typeof report.total[reportKey] === 'number' && typeof report[key][reportKey] === 'number') {
                report.total[reportKey] +=  report[key][reportKey];
            }
        });
    });
};