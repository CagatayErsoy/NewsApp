import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {path: 'home', loadChildren:()=>import('./components/home/home/home.module')
  .then(module=>module.HomeModule)},
  { path: '', redirectTo: 'home', pathMatch: 'full' 
},
  {path: 'login', loadChildren:()=>import('./components/login/login/login.module')
  .then(module=>module.LoginModule)},
  {path: 'register', loadChildren:()=>import('./components/register/register/register.module')
  .then(module=>module.RegisterModule)},
  {path: 'news', loadChildren:()=>import('./components/news/news/news.module')
  .then(module=>module.NewsModule)},
  {path: 'fav-news', loadChildren:()=>import('./components/fav-news/fav-news/fav-news.module')
  .then(module=>module.FavNewsModule)}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
