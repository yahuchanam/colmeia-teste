import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '1ts',
    loadChildren: () => import('./counter/counter.module').then(m => m.CounterModule)
  },
  {
    path: '5ts',
    loadChildren: () => import('./game/game.module').then(m => m.GameModule)
  },
  {
    path: '4ts',
    loadChildren: () => import('./busy-server/busy-server.module').then(m => m.BusyServerModule)
  },
  {
    path: '',
    redirectTo: '5ts',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
