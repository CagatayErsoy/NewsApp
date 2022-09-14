import { InjectionToken,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {HttpClientModule} from '@angular/common/http';


export const userUrl=new InjectionToken<string>('')
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
 

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
   
 
  ],
  providers: [
    {provide:userUrl, useValue:'http://localhost:4231'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
