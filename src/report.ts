import { PERIODS } from "./constants";
import { PlanName } from "./plan";
import { calculateCosts, correctUsers, updateUsers } from "./user";
import { calculateTotal } from "./total";
import { ProductName, updateProductSales } from "./product";
import { calculateTeam } from "./capex";
import { summary } from "./summary";
import { flattenObject } from "./utils";
import Papa from 'papaparse';
import { writeFileSync, existsSync, mkdirSync } from "fs";

export type PlanReport = {
    users: number;
    usersDiff: number;
    profit: number;
    revenue: number;
    marketingCosts: number;
    salesCount: number;
    balance: number;
    salesCountByProduct: Record<ProductName, number>;
    profitByProduct: Record<ProductName, number>;
    revenueByProduct: Record<ProductName, number>;
};

export type TeamReport = Record<string, number>;

export type Report = Record<PlanName, PlanReport> & {
    total: Omit<PlanReport, 'salesCountByProduct' | 'profitByProduct' | 'revenueByProduct'>;
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
    balance: 0,
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
    const periods = [];
    for (let month = 0; month < PERIODS; month++) {
        updateUsers({report, month});
        correctUsers({report, month});
        calculateCosts({report, month});
        updateProductSales({report, month});
        calculateTotal({report});
        calculateTeam({report});
        summary({report});
        periods.push({month, ...flattenObject(report)})
    }

    var csv = Papa.unparse(periods);

    if (!existsSync('./.outputs')) {
        mkdirSync('./.outputs');
    }
    
    writeFileSync(`./.outputs/${new Date().toISOString()}.csv`, csv, {encoding: 'utf-8'});
    return report;
};

