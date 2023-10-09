import { PlanName, plans } from "./plan";
import { Report, initializeParameterByProduct } from "./report";
import { wrapper } from "./utils";

export enum ProductName {
    FreeUserGood = 'free-user-good',
    FreeConsultation = 'free-consultation',

    BasicSubscription = 'basic-subscription',
    BasicUserGood = 'basic-user-good',
    BasicConsultation = 'basic-consultation',
     
    UltraSubscription = 'ultra-subscription',
    UltraUserGood = 'ultra-user-good',
    UltraConsultation = 'ultra-consultation',
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
    [ProductName.FreeUserGood]: {
        name: ProductName.FreeUserGood,
        frequency: 3 / 12,
        profit: 8,
        cost: 20,
    },
    [ProductName.FreeConsultation]: {
        name: ProductName.FreeConsultation,
        frequency: 1 / 12,
        profit: 6,
        cost: 2,
    },
    [ProductName.BasicSubscription]: {
        name: ProductName.BasicSubscription,
        frequency: 12 / 12,
        profit: 12,
        cost: 0,
    },
    [ProductName.BasicUserGood]: {
        name: ProductName.BasicUserGood,
        frequency: 4 / 12,
        profit: 4,
        cost: 20,
    },
    [ProductName.BasicConsultation]: {
        name: ProductName.BasicConsultation,
        frequency: 2 / 12,
        profit: 4,
        cost: 2,
    },
    [ProductName.UltraSubscription]: {
        name: ProductName.BasicUserGood,
        frequency: 12 / 12,
        profit: 20,
        cost: 0,
    },
    [ProductName.UltraUserGood]: {
        name: ProductName.BasicUserGood,
        frequency: 4 / 12,
        profit: 2,
        cost: 20,
    },
    [ProductName.UltraConsultation]: {
        name: ProductName.UltraConsultation,
        frequency: 2 / 12,
        profit: 0,
        cost: 2,
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