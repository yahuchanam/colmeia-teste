import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusyServerComponent } from './busy-server.component';

const routes: Routes = [{ path: '', component: BusyServerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusyServerRoutingModule { }
