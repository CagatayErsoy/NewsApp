import { InjectionToken,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { RoleInterceptor } from './services/role.interceptor';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import{ MatButtonModule} from '@angular/material/button'
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';


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
    StoreModule.forRoot({}, {}),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule
   
 
  ],
  providers: [
    {provide:userUrl, useValue:'http://localhost:4231'},
    {provide: HTTP_INTERCEPTORS, useClass:RoleInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
