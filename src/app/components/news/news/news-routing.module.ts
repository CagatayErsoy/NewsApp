import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from '../news.component';
import { LoginGuard } from 'src/app/guards/login.guard';

const routes: Routes = [
  {path:'' , component:NewsComponent, canActivate:[LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
