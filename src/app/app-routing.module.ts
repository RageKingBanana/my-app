import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { CrudUserComponent } from './crud-user/crud-user.component';
import { AuthGuard } from './guards/auth.guard';
import { EmployeeCrudComponent } from './employee-crud/employee-crud.component';
import { LogsComponent } from './logs/logs.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'crud-user',
    component: CrudUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app',
    component: AppComponent,
  },
  {
    path: 'employee-crud',
    component: EmployeeCrudComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'logs',
    component: LogsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
