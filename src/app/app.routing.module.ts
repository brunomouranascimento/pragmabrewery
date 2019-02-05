import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationGuard } from './authentication/authentication.guard';

import { LoginComponent } from './pages/login/login.component';
import { TruckComponent } from './pages/truck/truck.component';

const routes: Routes = [
  { path: '', component: TruckComponent, canActivate: [AuthenticationGuard]},
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
