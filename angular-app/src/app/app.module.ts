import * as $ from 'jquery';
import { AuthInterceptorService } from './components/auth/auth-interceptor.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { ProfileComponent } from './components/profile/profile.component';
import { InfoComponent } from './components/profile/info/info.component';
import { ViewProfilesComponent } from './components/profile/view-profiles/view-profiles.component';
import { EditProfilesComponent } from './components/profile/edit-profiles/edit-profiles.component';
import { EditResourcesComponent } from './components/profile/edit-resources/edit-resources.component';
import { EditCompetitionsAndTestsComponent } from './components/profile/edit-competitions-and-tests/edit-competitions-and-tests.component';
import { AvatarsCheckComponent } from './components/profile/avatars-check/avatars-check.component';
import { RegisterRequestsComponent } from './components/profile/register-requests/register-requests.component';
import { LessonsComponent } from './components/lessons/lessons.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectEraComponent } from './components/lessons/select-era/select-era.component';
import { SelectLessonComponent } from './components/lessons/select-lesson/select-lesson.component';
import { LessonComponent } from './components/lessons/lesson/lesson.component';
import { EditPracticeComponent } from './components/profile/edit-resources/edit-practice/edit-practice.component';
import { ChoosePracticeComponent } from './components/profile/edit-resources/choose-practice/choose-practice.component';
import { PracticeComponent } from './components/practice/practice.component';
import { SelectPracticeComponent } from './components/practice/select-practice/select-practice.component';
import { SolvePracticeComponent } from './components/practice/solve-practice/solve-practice.component';
import { ViewProfileComponent } from './components/profile/view-profile/view-profile.component';
import { CompetitionsOverviewComponent } from './components/competitions/competitions-overview/competitions-overview.component';
import { CompetitionsComponent } from './components/competitions/competitions.component';
import { PointsStatisticComponent } from './components/competitions/competitions-overview/points-statistic/points-statistic.component';
import { PointsStatisticPointsComponent } from './components/competitions/competitions-overview/points-statistic-points/points-statistic-points.component';
import { EditTestComponent } from './components/profile/edit-resources/edit-test/edit-test.component';
import { ChooseTestComponent } from './components/profile/edit-resources/choose-test/choose-test.component';
import { EditTestHeadingComponent } from './components/profile/edit-resources/edit-test/edit-test-heading/edit-test-heading.component';
import { AddNewQuestionComponent } from './components/profile/edit-resources/edit-test/add-new-question/add-new-question.component';
import { MultipleTextQuestionComponent } from './components/profile/edit-resources/questions/multiple-text-question/multiple-text-question.component';
import { MultipleImageQuestionComponent } from './components/profile/edit-resources/questions/multiple-image-question/multiple-image-question.component';
import { OpenQuestionComponent } from './components/profile/edit-resources/questions/open-question/open-question.component';
import { ImageInputComponent } from './components/profile/edit-resources/questions/multiple-image-question/image-input/image-input.component';
import { ToggleTcComponent } from './components/profile/edit-competitions-and-tests/toggle-tc/toggle-tc.component';
import { ChooseComponent } from './components/profile/edit-competitions-and-tests/choose/choose.component';
import { CheckTcComponent } from './components/profile/edit-competitions-and-tests/check-tc/check-tc.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    ProfileComponent,
    InfoComponent,
    ViewProfilesComponent,
    EditProfilesComponent,
    EditResourcesComponent,
    EditCompetitionsAndTestsComponent,
    AvatarsCheckComponent,
    RegisterRequestsComponent,
    LessonsComponent,
    SelectEraComponent,
    SelectLessonComponent,
    LessonComponent,
    EditPracticeComponent,
    ChoosePracticeComponent,
    PracticeComponent,
    SelectPracticeComponent,
    SolvePracticeComponent,
    ViewProfileComponent,
    CompetitionsComponent,
    CompetitionsOverviewComponent,
    PointsStatisticComponent,
    PointsStatisticPointsComponent,
    EditTestComponent,
    ChooseTestComponent,
    EditTestHeadingComponent,
    AddNewQuestionComponent,
    MultipleTextQuestionComponent,
    MultipleImageQuestionComponent,
    OpenQuestionComponent,
    ImageInputComponent,
    ToggleTcComponent,
    ChooseComponent,
    CheckTcComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DragDropModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
