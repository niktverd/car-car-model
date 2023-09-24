import { omit } from "lodash";
import { PlanName } from "./plan";
import { PlanReport, Report } from "./report"
import { wrapper } from "./utils";

type CalculateTotalArgs = {
    report: Report;
};

export const calculateTotal = ({report}: CalculateTotalArgs) => {
    wrapper(report, (key: PlanName) => {
        const reports = omit(report, 'team', PlanName.Total);
        const planReport = reports[key];
        if (!planReport) {
            return;
        }

        const reportKeys = Object.keys(planReport) as (keyof PlanReport)[];

        reportKeys.forEach((reportKey) => {
            if (typeof report.total[reportKey] === 'number' && typeof report[key][reportKey] === 'number') {
                report.total[reportKey] +=  report[key][reportKey];
            }
        });

        report.total = omit(report.total, 'salesCountByProduct', 'profitByProduct', 'revenueByProduct')
    });
};