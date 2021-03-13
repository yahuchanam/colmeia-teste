import { ICountable } from "../interfaces";
import { Count } from "./count.model";

export class LetterCount extends Count implements ICountable {
    count(text: string): any {

        const letters: string[] = this.removerAcentos(text)
            .replace(/\s/g, '')
            .replace(/.(.)(?=.*\1)/g, '')
            .split('');

        for (let i of letters) {
            this.add(i, text.split(i).length - 1);
        }

        return this.acc;
    }

    removerAcentos(texto: string): string {
        const mapaAcentosHex = {
            a: /[\xE0-\xE6]/g,
            e: /[\xE8-\xEB]/g,
            i: /[\xEC-\xEF]/g,
            o: /[\xF2-\xF6]/g,
            u: /[\xF9-\xFC]/g,
            c: /\xE7/g,
            n: /\xF1/g
        };

        for (const letra in mapaAcentosHex) {
            texto = texto.replace(mapaAcentosHex[letra], letra);
        }
        return texto;
    }
}