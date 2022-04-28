import { ProfileComponent } from './components/profile/profile.component';
import { LoggedInGuard } from './components/auth/logged-in-guard';
import { AuthGuard } from './components/auth/auth-guard';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoggedInGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [LoggedInGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
