import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { TabuleiroComponent } from './tabuleiro/tabuleiro.component';
import { CasaComponent } from './casa/casa.component';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ControlesComponent } from './controles/controles.component';
import { AcoesComponent } from './acoes/acoes.component';

@NgModule({
  declarations: [
    GameComponent,
    TabuleiroComponent,
    CasaComponent,
    ControlesComponent,
    AcoesComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSliderModule,
    MatSlideToggleModule
  ]
})
export class GameModule { }
