import { ICoordenada } from "./";

export interface IPeca {
    jogadasPossiveis: ICoordenada[];
    coordenada: ICoordenada;
    tentarJogada():boolean;
    mover(coordenada: ICoordenada):void;
}
