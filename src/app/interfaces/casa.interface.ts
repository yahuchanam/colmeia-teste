import { IPeca, ICoordenada } from './';

export interface ICasa {
    coordenada: ICoordenada;
    peca?: IPeca;
    sobAtaque?: boolean;
}
