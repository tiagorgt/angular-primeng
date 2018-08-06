import { UnitMeasurement } from "./unit-measurement";

export class Item {
    constructor(json?: any) {
        if (json) {
            this.key = json.key;
            this.name = json.name;
            this.unitMeasurement = json.unitMeasurement;
            this.amount = json.amount;
            this.price = json.price;
            this.perishableProduct = json.perishableProduct;
            this.expirationDate = new Date(json.expirationDate);
            this.manufacturingDate = new Date(json.manufacturingDate);
        }
    }

    key: string;
    name: string;
    unitMeasurement: UnitMeasurement;
    amount: number;
    price: number;
    perishableProduct: boolean;
    expirationDate: Date;
    manufacturingDate: Date;
}