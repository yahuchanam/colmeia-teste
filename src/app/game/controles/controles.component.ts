import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IControlesData } from 'src/app/interfaces';
import { ControleService } from 'src/app/services/controle.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-controles',
  templateUrl: './controles.component.html',
  styleUrls: ['./controles.component.scss']
})
export class ControlesComponent implements OnInit, OnDestroy {

  subSink: SubSink = new SubSink();

  formGroup: FormGroup = this._formBuilder.group({
    'tamanho': [8, [Validators.required, Validators.min(4), Validators.max(30)]],
    'pausa': [true, []]
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _controleService: ControleService
  ) { }

  ngOnInit(): void {
    this.subSink.sink = this.formGroup.valueChanges.subscribe(
      (value: IControlesData) => {
        this._controleService.setData(value);
      }
    );

    this.subSink.sink = this._controleService.sub.subscribe(
      (event: IControlesData) => {
        this.formGroup.patchValue(event, { emitEvent: false });
      }
    );
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

}
