import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IControlesData } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ControleService {

  sub = new EventEmitter<IControlesData>();

  constructor() { }

  setData(data: IControlesData): void {
    this.sub.emit(data);
  }
}
