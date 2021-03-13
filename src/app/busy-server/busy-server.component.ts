import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BusyService } from 'src/app/services/busy.service';

@Component({
  selector: 'app-busy-server',
  templateUrl: './busy-server.component.html',
  styleUrls: ['./busy-server.component.scss']
})
export class BusyServerComponent implements OnInit {

  @ViewChild('logger') logger: ElementRef;
  prompt: string = '';
  concluido: boolean = false;

  constructor(
    private _busyService: BusyService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.prompt += "Entrando\n";
    let total: number = 100;
    try {
      this.recursivePromisse(total)
        .then((resultado: number) => {
          this.prompt += "Finally\n";
          this.prompt += "Sum: ${resultado}\n";
          this.concluido = true;
        });
    } catch (err) {
      this.prompt += "Erro na requisição\n";
      this.prompt += "Tentando novamente\n";
      this.init();
    }
  };

  recursivePromisse(total: number, k: number = 0, soma: number = 0): Promise<number> {
    return new Promise<number>((resolve) => {
      return resolve(
        this._busyService.thisIsABlacboxYouCannotChange(k).then(
          (resSoma: number) => {
            soma += resSoma;
            this.prompt += `Valor atual: ${soma}, ainda calculando...\n`;
            this.logger.nativeElement.scrollTop = Number.MAX_SAFE_INTEGER;
            if (k < total) {
              return this.recursivePromisse(total, ++k, soma);
            } else {
              return soma;
            }
          }
        )
      );
    });
  }

}
