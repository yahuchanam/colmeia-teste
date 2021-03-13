import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IControlesData, ICoordenada } from 'src/app/interfaces';
import { SubSink } from 'subsink';
import { ControleService } from '../services/controle.service';
import { TabuleiroComponent } from './tabuleiro/tabuleiro.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() tamanho: number = 8;
  @Input() pausaEntreJogadas: boolean = true;

  @ViewChild('tabuleiro') tabuleiro: TabuleiroComponent;

  // Posições sugeridas
  posicoesDama: ICoordenada[] = [{ x: 3, y: 1 }, { x: 5, y: 2 }, { x: 6, y: 3 }, { x: 2, y: 0 }, { x: 0, y: 7 }, { x: 7, y: 0 }, { x: 3, y: 3 }, { x: 4, y: 4 }];

  ponteiro: number = 0;
  tentativas: number = 0;
  resultado: string = '';
  sub: SubSink = new SubSink();

  constructor(
    private _changeDetector: ChangeDetectorRef,
    private _controleService: ControleService
  ) { }

  ngOnInit(): void {
    this.sub.sink = this._controleService.sub.subscribe(
      (event: IControlesData) => {
        this.tamanho = event.tamanho;
        this.pausaEntreJogadas = event.pausa;
        this.limpar();
      }
    );
  }

  ngAfterViewInit(): void {
    this.montarTabuleiro(this.tamanho);
    this._changeDetector.detectChanges();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  limpar(): void {
    this.tentativas = 0;
    this.resultado = '';
    this.montarTabuleiro(this.tamanho);
  }

  montarTabuleiro(tamanho: number): void {
    this.ponteiro = 0;
    this.tamanho = tamanho;
    this.tabuleiro.limpar(this.tamanho);
  }

  resolverExercicio(): void {
    this.montarTabuleiro(8);
    this._controleService.setData({ tamanho: 8, pausa: this.pausaEntreJogadas });
    this.adicinarDamasExercicio();
  }

  adicinarDamasExercicio(): void {
    this.tentativas = 1;

    for (const p of this.posicoesDama) {
      this.tabuleiro.jogarDama(p);
    }

    this.tabuleiro.analisarColisoes();
    this.analisarJogada(false);
  }

  resolverAleatorio(): void {
    this.tentativas = 1;
    this.montarTabuleiro(this.tamanho);
    this.jogarRodada();
  }

  resolver(): void {
    this.tentativas = 1;
    this.limpar();
    this.resolverAleatorio();
  }

  tentarNovamente(): void {
    this.ponteiro = 0;
    this.tentativas++;
    this.tabuleiro.limpar(this.tamanho);
  }

  jogarRodada(): void {
    if (this.tabuleiro.pecas.length === this.tamanho) {
      this.resultado = 'Resolvido!';
      return;
    }

    this.tabuleiro.jogarDamaAleatorio(this.ponteiro);
    this.ponteiro++;
    this.tabuleiro.analisarColisoes();
    this.analisarJogada();
  }

  analisarJogada(resolucao: boolean = true): void {
    const fimJogo: boolean = this.tabuleiro.analisarFimDeJogo(this.ponteiro);
    if (fimJogo && !resolucao) {
      this.resultado = 'Damas em colisão!';
      return;
    }

    if (fimJogo && resolucao) {
      this.tentarNovamente();
    }

    this.pausarParaProxima();
  }

  pausarParaProxima(): void {
    if (this.pausaEntreJogadas) {
      setTimeout(() => {
        this.jogarRodada();
      }, 10);
    } else {
      this.jogarRodada();
    }
  }
}
