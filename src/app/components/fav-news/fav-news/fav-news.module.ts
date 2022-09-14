import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FavNewsComponent } from '../fav-news.component';
import { FavNewsRoutingModule } from './fav-news-routing.module';


@NgModule({
  declarations: [FavNewsComponent],
  imports: [
    SharedModule,
    FavNewsRoutingModule
  ]
})
export class FavNewsModule { }
