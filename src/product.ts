import { PlanName, plans } from "./plan";
import { Report, initializeParameterByProduct } from "./report";
import { wrapper } from "./utils";

export enum ProductName {
    Subscription = 'subscription',
    FreeUserGood = 'free-user-good',
    BasicUserGood = 'basic-user-good',
};

export type Product = {
    name: ProductName;
    frequency: number;
    profit: number;
    cost: number;
};

export type Products = Record<ProductName, Product>;

type UpdateEarningsArgs = {
    report: Report;
    month: number;
};

export const products: Products = {
    [ProductName.Subscription]: {
        name: ProductName.Subscription,
        frequency: 12 / 12,
        profit: 12,
        cost: 0,
    },
    [ProductName.FreeUserGood]: {
        name: ProductName.FreeUserGood,
        frequency: 6 / 12,
        profit: 8,
        cost: 20,
    },
    [ProductName.BasicUserGood]: {
        name: ProductName.BasicUserGood,
        frequency: 6 / 12,
        profit: 4,
        cost: 20,
    },
};

export const updateProductSales = ({report}: UpdateEarningsArgs) => {
    wrapper(report, (key: PlanName) => {
        const plan = plans.find((p) => p.name === key);
        if (!plan || !plan.availableProducts) {
            return;
        }

        report[key].profitByProduct = initializeParameterByProduct(0);
        report[key].salesCountByProduct = initializeParameterByProduct(0);
        report[key].revenueByProduct = initializeParameterByProduct(0);

        let profit = 0;
        let salesCount = 0;
        let revenue = 0;
        for (const productName of plan.availableProducts) {
            const product = products[productName];
            const salesCountByProduct = Math.ceil(product.frequency * report[key].users);
            const profitByProduct = product.profit * salesCountByProduct;
            const revenueByProduct = (product.cost + product.profit) * salesCountByProduct;
            report[key].profitByProduct[productName] = profitByProduct;
            report[key].salesCountByProduct[productName] = salesCountByProduct;
            report[key].revenueByProduct[productName] = revenueByProduct;
            profit += profitByProduct;
            salesCount += salesCountByProduct;
            revenue += revenueByProduct;
        }

        report[key].salesCount = salesCount;
        report[key].profit = profit;
        report[key].revenue = revenue;
    });
};