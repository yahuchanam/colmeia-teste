import { Component, Input, OnInit } from '@angular/core';
import { ICasa } from 'src/app/interfaces';

@Component({
  selector: 'app-casa',
  templateUrl: './casa.component.html',
  styleUrls: ['./casa.component.scss']
})
export class CasaComponent implements OnInit {

  @Input() info: ICasa;

  constructor() { }

  ngOnInit(): void {
  }

}
