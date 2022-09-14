import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavNewsComponent } from '../fav-news.component';

const routes: Routes = [
  {path:'', component:FavNewsComponent,
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavNewsRoutingModule { }
