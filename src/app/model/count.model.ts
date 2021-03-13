import { ICount } from "../interfaces";

export class Count implements ICount {
    protected acc: any = {};
    add(text: string, quantity: number = 1): void {
        if (this.acc[text] === undefined) {
            this.acc[text] = quantity;
        } else {
            this.acc[text] += quantity;
        }
    }

    print(): string[] {
        const retorno: string[] = [];
        for (const key in this.acc) {
            if (Object.prototype.hasOwnProperty.call(this.acc, key)) {
                const e = this.acc[key];
                retorno.push(`${key}: ${e}`);
            }
        }
        return retorno;
    }
}
