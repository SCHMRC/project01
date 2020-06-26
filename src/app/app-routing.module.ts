import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ElaborazioneComponent } from './elaborazione/elaborazione.component';
import { StatisticaComponent } from './statistica/statistica.component';
import { CalcoloComponent } from './calcolo/calcolo.component';


const routes: Routes = [
  {path: 'elaborazione', component: ElaborazioneComponent},
  {path: 'statistica', component: StatisticaComponent},
  {path: 'applet', component: CalcoloComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const COMPONENT = [
  ElaborazioneComponent,
  StatisticaComponent,
  CalcoloComponent

]
