import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { CrudUserComponent } from './crud-user/crud-user.component';
import { AuthGuard } from 'src/services/auth.guard';
const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'crud-user',
    component:CrudUserComponent,
    canActivate: [AuthGuard] // Apply the AuthGuard to this route
  },
  {
    path: 'app',
    component: AppComponent 
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
