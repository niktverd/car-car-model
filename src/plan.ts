import { ProductName } from "./product";

export enum PlanName {
    Free = 'free',
    Basic = 'basic',
    Ultra = 'ultra',
    Total = 'total',
};

export type Plan = {
    name: PlanName;
    subscription: number;
    frequency: number;
    cac: number;
    minimalGrowthCount: number;
    growthRate: number;
    churnRate: number;
    sourceOfUserAqcusition: PlanName | null;
    availableProducts: ProductName[];
}

export const initialPlan: Plan = {
    name: PlanName.Free,
    sourceOfUserAqcusition: null,
    frequency: 6/12,
    cac: 8,
    minimalGrowthCount: 100,
    growthRate: 0.15,
    subscription: 0,
    churnRate: 0.07,
    availableProducts: [ProductName.FreeUserGood, ProductName.BasicConsultation],
};

export const plans: Plan[] = [
    {
       ...initialPlan,
    },
    {
        ...initialPlan,
        name: PlanName.Basic,
        sourceOfUserAqcusition: PlanName.Free,
        cac: 2,
        minimalGrowthCount: 20,
        growthRate: 0.02,
        subscription: 10,
        churnRate: 0.1,
        availableProducts: [ProductName.BasicSubscription, ProductName.BasicUserGood, ProductName.BasicConsultation],
    },
    {
        ...initialPlan,
        name: PlanName.Ultra,
        sourceOfUserAqcusition: PlanName.Basic,
        cac: 10,
        minimalGrowthCount: 20,
        growthRate: 0.02,
        subscription: 10,
        churnRate: 0.1,
        availableProducts: [ProductName.UltraSubscription, ProductName.UltraUserGood, ProductName.UltraConsultation],
    },
];
