import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { CrudUserComponent } from './crud-user/crud-user.component';
import { AuthGuard } from './guards/auth.guard';
import { EmployeeCrudComponent } from './employee-crud/employee-crud.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'crud-user',
    component: CrudUserComponent,
    canActivate: [AuthGuard], // Apply the AuthGuard to this route
  },
  {
    path: 'app',
    component: AppComponent,
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'employee-crud',
    component: EmployeeCrudComponent,
    canActivate: [AuthGuard], // Apply the AuthGuard to this route
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
