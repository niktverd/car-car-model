import { ProductName } from "./product";

export enum PlanName {
    Free = 'free',
    Basic = 'basic',
    Total = 'total',
    // Team = 'team',
};

export type Plan = {
    name: PlanName;
    subscription: number;
    frequency: number;
    cac: number;
    minimalGrowthCount: number;
    growthRate: number;
    initialCount: number;
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
    initialCount: 0,
    subscription: 0,
    availableProducts: [ProductName.FreeUserGood],
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
        availableProducts: [ProductName.Subscription, ProductName.BasicUserGood],
    },
];
