import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ ReactiveFormsModule,FormsModule} from '@angular/forms';
import { InfiniteScrollModule } from "ngx-infinite-scroll";

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule
  ],
  exports:[ FormsModule,
    InfiniteScrollModule, CommonModule,ReactiveFormsModule,]
})
export class SharedModule { }
