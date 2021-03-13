import { Component, Input } from '@angular/core';
import { IPeca, ICoordenada, ICasa } from 'src/app/interfaces';
import { Dama } from 'src/app/model';

@Component({
  selector: 'app-tabuleiro',
  templateUrl: './tabuleiro.component.html',
  styleUrls: ['./tabuleiro.component.scss']
})
export class TabuleiroComponent {

  tamanho: number;
  atacados: ICoordenada[][] = [];
  tentativasInvalidas: string[] = [];

  @Input() casas: ICasa[] = [];
  private _pecas: IPeca[] = [];

  @Input()
  set pecas(p: IPeca[]) {
    this._pecas = p;
    for (const c of this.casas) {
      for (const p of this._pecas) {
        if (c.coordenada.x === p.coordenada.x && c.coordenada.y === p.coordenada.y) {
          c.peca = p;
          c.sobAtaque = false;
          p.coordenada = c.coordenada;
        }
      }
    }
  }

  get pecas(): IPeca[] {
    return this._pecas;
  }

  constructor() { }

  jogarDamaAleatorio(ponteiro: number): void {
    const dama: Dama = new Dama();
    dama.jogadasPossiveis = this.jogadasValidas(ponteiro);
    this.pecas.push(dama);
    dama.tentarJogada();
    const pos = (dama.coordenada.x * this.tamanho) + dama.coordenada.y;
    this.casas[pos].peca = dama;
  }

  jogarDama(coordenada: ICoordenada): void {
    const dama: Dama = new Dama();
    dama.mover(coordenada);
    const pos = (dama.coordenada.x * this.tamanho) + dama.coordenada.y;
    this.pecas.push(dama);
    this.casas[pos].peca = dama;
  }

  jogadasValidas(x: number): ICoordenada[] {
    const jogadas: ICoordenada[] = [];
    this.casas.forEach((c: ICasa) => {
      if (!c.sobAtaque && c.coordenada.x === x) {
        jogadas.push(c.coordenada);
      }
    });
    return jogadas;
  }

  limpar(tamanho: number): void {
    this.tamanho = tamanho;
    this.casas = [];
    this.pecas = [];
    for (let x = 0; x < tamanho; x++) {
      for (let y = 0; y < tamanho; y++) {
        const casa: ICasa = {
          coordenada: { x, y },
          sobAtaque: false,
          peca: undefined
        };
        this.casas.push(casa);
      }
    }
  }

  analisarLinhaComCasaLivre(p: number): boolean {
    const pos = p * this.tamanho;
    const linha: ICasa[] = this.casas.slice(pos, pos + this.tamanho);
    for (const l of linha) {
      if (!l.sobAtaque) {
        return true;
      }
    }
    return false;
  }

  analisarFimDeJogo(p: number): boolean {
    let conflitos = 0;
    for (let i = p; i < this.tamanho; i++) {
      if (!this.analisarLinhaComCasaLivre(i)) {
        conflitos++;
      }
    }
    return conflitos !== 0;
  }

  analisarColisoes(): boolean {
    let colisao = false;
    for (const casa of this.casas) {
      colisao = this.analisarColisoesCasa(casa, colisao);
    }
    return colisao;
  }

  analisarColisoesCasa(casa: ICasa, colisao: boolean): boolean {
    casa.sobAtaque = false;
    for (const peca of this.pecas) {
      //Horizontal
      const h = peca.coordenada.x === casa.coordenada.x;
      //Vertical
      const v = peca.coordenada.y === casa.coordenada.y;
      //Diagonal ascendente
      const da = ((peca.coordenada.y + peca.coordenada.x) === (casa.coordenada.x + casa.coordenada.y));
      //Diagonal descendente
      const dd = ((peca.coordenada.y - peca.coordenada.x) === (casa.coordenada.y - casa.coordenada.x));
      casa.sobAtaque = (h || v || da || dd || casa.sobAtaque) && casa.peca === undefined;
      colisao = colisao || casa.sobAtaque;
    }
    return colisao;
  }
}
