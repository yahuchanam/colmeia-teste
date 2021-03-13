import { IPeca, ICoordenada } from '../interfaces';

export class Dama implements IPeca {

    jogadasPossiveis: ICoordenada[] = [];
    coordenada: ICoordenada;

    tentarJogada(): boolean {
        if (this.jogadasPossiveis.length > 0) {
            const proxima = Math.round(Math.random() * this.jogadasPossiveis.length - 1);
            const jogada: ICoordenada = this.jogadasPossiveis.splice(proxima, 1)[0];
            this.mover(jogada);
            return true;
        } else {
            return false;
        }
    }

    mover(coordenada: ICoordenada): void {
        this.coordenada = coordenada;
    }
}
