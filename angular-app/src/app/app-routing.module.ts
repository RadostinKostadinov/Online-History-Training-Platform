import { AdminGuard } from './components/auth/admin.guard';
import { SolvePracticeComponent } from './components/practice/solve-practice/solve-practice.component';
import { SelectPracticeComponent } from './components/practice/select-practice/select-practice.component';
import { PracticeComponent } from './components/practice/practice.component';
import { ChoosePracticeComponent } from './components/profile/edit-resources/choose-practice/choose-practice.component';
import { EditPracticeComponent } from './components/profile/edit-resources/edit-practice/edit-practice.component';
import { SelectLessonComponent } from './components/lessons/select-lesson/select-lesson.component';
import { SelectEraComponent } from './components/lessons/select-era/select-era.component';
import { LessonsComponent } from './components/lessons/lessons.component';
import { RegisterRequestsComponent } from './components/profile/register-requests/register-requests.component';
import { AvatarsCheckComponent } from './components/profile/avatars-check/avatars-check.component';
import { EditCompetitionsAndTests } from './components/profile/edit-competitions-and-tests/edit-competitions-and-tests.component';
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
import { LessonComponent } from './components/lessons/lesson/lesson.component';
import { ViewProfileComponent } from './components/profile/view-profile/view-profile.component';
import { CompetitionsComponent } from './components/competitions/competitions.component';
import { CompetitionsOverviewComponent } from './components/competitions/competitions-overview/competitions-overview.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoggedInGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoggedInGuard] },
  {
    path: 'practice', component: PracticeComponent, canActivate: [AuthGuard], children: [
      { path: '', pathMatch: 'full', redirectTo: 'select-practice' },
      { path: 'select-practice', component: SelectPracticeComponent, canActivate: [AuthGuard] },
      { path: 'solve-practice', component: SolvePracticeComponent, canActivate: [AuthGuard] },
    ]
  },
  {
    path: 'competitions', component: CompetitionsComponent, canActivate: [AuthGuard], children: [
      { path: '', pathMatch: 'full', redirectTo: 'overview' },
      { path: 'overview', component: CompetitionsOverviewComponent, canActivate: [AuthGuard]},
    ]
  },
  {
    path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
      { path: '', pathMatch: 'full', redirectTo: 'edit-resources' },
      {
        path: '', canActivateChild: [AdminGuard], children: [
          { path: 'view-profiles', component: ViewProfilesComponent, canActivate: [AuthGuard] },
          { path: 'view-profile', component: ViewProfileComponent, canActivate: [AuthGuard] },
          { path: 'edit-profiles', component: EditProfilesComponent, canActivate: [AuthGuard] },
          { path: 'edit-resources', component: EditResourcesComponent, canActivate: [AuthGuard] },
          { path: 'competitions', component: EditCompetitionsAndTests, canActivate: [AuthGuard] },
          { path: 'avatars-check', component: AvatarsCheckComponent, canActivate: [AuthGuard] },
          { path: 'register-requests', component: RegisterRequestsComponent, canActivate: [AuthGuard] },
          { path: 'edit-practice', component: EditPracticeComponent, canActivate: [AuthGuard] },
          { path: 'choose-practice', component: ChoosePracticeComponent, canActivate: [AuthGuard] }
        ]
      },
      { path: 'info', component: InfoComponent, canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'lessons', component: LessonsComponent, canActivate: [AuthGuard], children: [
      { path: '', pathMatch: 'full', redirectTo: 'select-era' },
      { path: 'select-era', component: SelectEraComponent, canActivate: [AuthGuard] },
      { path: 'select-lesson', component: SelectLessonComponent, canActivate: [AuthGuard] },
      { path: 'lesson', component: LessonComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
