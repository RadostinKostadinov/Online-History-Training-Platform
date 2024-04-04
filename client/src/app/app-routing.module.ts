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
import { EditCompetitionsAndTestsComponent } from './components/profile/edit-competitions-and-tests/edit-competitions-and-tests.component';
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
import { ChooseTestComponent } from './components/profile/edit-resources/choose-test/choose-test.component';
import { EditTestComponent } from './components/profile/edit-resources/edit-test/edit-test.component';
import { ToggleTcComponent } from './components/profile/edit-competitions-and-tests/toggle-tc/toggle-tc.component';
import { ChooseComponent } from './components/profile/edit-competitions-and-tests/choose/choose.component';
import { CheckTcComponent } from './components/profile/edit-competitions-and-tests/check-tc/check-tc.component';
import { SolveTcComponent } from './components/competitions/competitions-overview/solve-tc/solve-tc.component';
import { EditCompetitionComponent } from './components/profile/edit-resources/edit-competition/edit-competition.component';
import { ChooseCompetitionComponent } from './components/profile/edit-resources/choose-competition/choose-competition.component';
import { CheckTcChooseStudentComponent } from './components/profile/edit-competitions-and-tests/check-tc-choose-student/check-tc-choose-student.component';
import { ViewTcSolutionComponent } from './components/profile/edit-competitions-and-tests/view-tc-solution/view-tc-solution.component';
import { MyAvatarsComponent } from './components/profile/info/my-avatars/my-avatars.component';
import { CreateAvatarComponent } from './components/profile/info/create-avatar/create-avatar.component';
import { EditStudentComponent } from './components/profile/edit-profiles/edit-student/edit-student.component';
import { TeacherProfileComponent } from './components/profile/teacher-profile/teacher-profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoggedInGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoggedInGuard],
  },
  {
    path: 'practice',
    component: PracticeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'select-practice' },
      {
        path: 'select-practice',
        component: SelectPracticeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'solve-practice',
        component: SolvePracticeComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'competitions',
    component: CompetitionsComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'overview' },
      {
        path: 'overview',
        component: CompetitionsOverviewComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'solve-tc/:tcId',
        component: SolveTcComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'edit-resources' },
      {
        path: '',
        canActivateChild: [AdminGuard],
        children: [
          {
            path: 'teacher-info',
            component: TeacherProfileComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'view-profiles',
            component: ViewProfilesComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'view-profile',
            component: ViewProfileComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'edit-profiles',
            component: EditProfilesComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'edit-resources',
            component: EditResourcesComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'competitions',
            component: EditCompetitionsAndTestsComponent,
            canActivate: [AuthGuard],
            children: [
              {
                path: '',
                pathMatch: 'full',
                component: ChooseComponent,
              },
              {
                path: 'toggle',
                component: ToggleTcComponent,
              },
              {
                path: 'check',
                component: CheckTcComponent,
              },
              {
                path: 'check/solution',
                component: ViewTcSolutionComponent,
              },
              {
                path: 'check/:id',
                component: CheckTcChooseStudentComponent,
              },
            ],
          },
          {
            path: 'avatars-check',
            component: AvatarsCheckComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'register-requests',
            component: RegisterRequestsComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'edit-practice',
            component: EditPracticeComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'edit-test',
            component: EditTestComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'edit-competition',
            component: EditCompetitionComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'choose-practice',
            component: ChoosePracticeComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'choose-test',
            component: ChooseTestComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'choose-competition',
            component: ChooseCompetitionComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'edit-profiles/profile/:studentId',
            component: EditStudentComponent,
            canActivate: [AuthGuard],
          },
        ],
      },
      {
        path: 'info',
        component: InfoComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'info/my-avatars',
        component: MyAvatarsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'info/create-avatar',
        component: CreateAvatarComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'lessons',
    component: LessonsComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'select-era' },
      {
        path: 'select-era',
        component: SelectEraComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'select-lesson',
        component: SelectLessonComponent,
        canActivate: [AuthGuard],
      },
      { path: 'lesson', component: LessonComponent, canActivate: [AuthGuard] },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
