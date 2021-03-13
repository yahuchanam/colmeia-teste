import { Count } from './count.model';
import { ICountable } from '../interfaces';

export class WordCount extends Count implements ICountable {
    count(text: string): any {
        const texts: string[] = text.split(/\s/g);
        for (let i of texts) {
            this.add(i);
        }
        return this.acc;
    }
}
