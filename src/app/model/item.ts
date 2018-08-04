import { UnitMeasurement } from "./unit-measurement";

export class Item {
    key: string;
    name: string;
    unitMeasurement: UnitMeasurement;
    amount: number;
    price: number;
    perishableProduct: boolean;
    expirationDate: Date;
    manufacturingDate: Date;
}