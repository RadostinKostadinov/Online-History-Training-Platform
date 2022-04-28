import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

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
import { CompetitionsComponent } from './components/profile/competitions/competitions.component';
import { AvatarsCheckComponent } from './components/profile/avatars-check/avatars-check.component';

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
    CompetitionsComponent,
    AvatarsCheckComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
