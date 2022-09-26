import { NgModule } from '@angular/core';
import { NewsRoutingModule} from './news-routing.module';
import { NewsComponent } from '../news.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
  declarations: [NewsComponent],
  imports: [
    SharedModule,
    NewsRoutingModule,
    MatIconModule,
    MatButtonToggleModule
   

  ]
})
export class NewsModule { }
