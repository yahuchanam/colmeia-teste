import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusyServerRoutingModule } from './busy-server-routing.module';
import { BusyServerComponent } from './busy-server.component';


@NgModule({
  declarations: [BusyServerComponent],
  imports: [
    CommonModule,
    BusyServerRoutingModule
  ]
})
export class BusyServerModule { }
