import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.scss']
})
export class AcoesComponent implements OnInit {

  @Output() resolverExercicio = new EventEmitter<void>();
  @Output() resolver = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
