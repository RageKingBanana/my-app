import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'app',
    component: AppComponent // Replace with your main application component
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];


@NgModule({
  
  imports: [RouterModule.forRoot(routes)
  ,CommonModule,
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
