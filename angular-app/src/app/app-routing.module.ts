import { AvatarsCheckComponent } from './components/profile/avatars-check/avatars-check.component';
import { CompetitionsComponent } from './components/profile/competitions/competitions.component';
import { EditResourcesComponent } from './components/profile/edit-resources/edit-resources.component';
import { ViewProfilesComponent } from './components/profile/view-profiles/view-profiles.component';
import { EditProfilesComponent } from './components/profile/edit-profiles/edit-profiles.component';
import { InfoComponent } from './components/profile/info/info.component';
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
  { path: 'login', component: LoginComponent, canActivate: [LoggedInGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoggedInGuard] },
  {
    path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], children: [
      { path: '', pathMatch: 'full', redirectTo: 'info' },
      { path: 'info', component: InfoComponent, canActivate: [AuthGuard] },
      { path: 'view-profiles', component: ViewProfilesComponent, canActivate: [AuthGuard] },
      { path: 'edit-profiles', component: EditProfilesComponent, canActivate: [AuthGuard] },
      { path: 'edit-resources', component: EditResourcesComponent, canActivate: [AuthGuard] },
      { path: 'competitions', component: CompetitionsComponent, canActivate: [AuthGuard] },
      { path: 'avatars-check', component: AvatarsCheckComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
