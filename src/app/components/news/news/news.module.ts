import { NgModule } from '@angular/core';
import { NewsRoutingModule} from './news-routing.module';
import { NewsComponent } from '../news.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [NewsComponent],
  imports: [
    SharedModule,
    NewsRoutingModule,
   

  ]
})
export class NewsModule { }
