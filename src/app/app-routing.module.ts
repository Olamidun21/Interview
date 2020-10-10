import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import { ImageComponent } from './image/image.component';
import { SidenavComponent } from './sidenav/sidenav.component';


const routes: Routes = [
  {path:'',redirectTo:"login",pathMatch:'full'},
  {path:'profile',component:ImageComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'nav',component:SidenavComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
