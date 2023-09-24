import { PERIODS } from "./constants";
import { PlanName } from "./plan";
import { calculateCosts, correctUsers, updateUsers } from "./user";
import { calculateTotal } from "./total";
import { ProductName, updateProductSales } from "./product";
import { calculateTeam } from "./capex";

export type PlanReport = {
    users: number;
    usersDiff: number;
    profit: number;
    revenue: number;
    marketingCosts: number;
    salesCount: number;
    salesCountByProduct: Record<ProductName, number>;
    profitByProduct: Record<ProductName, number>;
    revenueByProduct: Record<ProductName, number>;
};

export type TeamReport = Record<string, number>;

export type Report = Record<PlanName, PlanReport> & {
    total: PlanReport;
    team: TeamReport;
};

export const initializeParameterByProduct: (initialValue: number) => Record<ProductName, number> = (initialValue = 0) => {
    const values = Object.values(ProductName);
    
    return values.reduce((acc, value) => {
        acc[value] = initialValue;
        return acc;
    }, {} as Record<ProductName, number>);
};

export const initialPlanReport: PlanReport  = {
    users: 0,
    usersDiff: 0,
    profit: 0,
    revenue: 0,
    salesCount: 0,
    marketingCosts: 0,
    salesCountByProduct: initializeParameterByProduct(0),
    profitByProduct: initializeParameterByProduct(0),
    revenueByProduct: initializeParameterByProduct(0),
};

export const getInitialReport = (): Report => {
    const values = Object.values(PlanName) as PlanName[];
    
    const initReport: Report = values.reduce((acc, value) => {
        acc[value] = { ...initialPlanReport };

        return acc;
    }, {} as Report); 


    return {
        ...initReport,
        total: {
            ...initialPlanReport,
        },
    };
};

export const getReport = (): Report => {
    const report = getInitialReport();

    for (let month = 0; month < PERIODS; month++) {
        updateUsers({report, month});
        correctUsers({report, month});
        calculateCosts({report, month});
        updateProductSales({report, month});
        calculateTotal({report});
        calculateTeam({report});
        console.log('\n\n===', month, '===\n', report);
    }
    

    return report;
};