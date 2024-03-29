import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import * as fromApp from './store/app.reducer'
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';
import { UsersEffects } from './users/store/users.effects';
import { FeedModule } from './feed/feed.module';
import { AuthGuard } from './auth-guard.service';
import { ProfileResolver } from './profile/profile-resolver.service';
import { WeatherModule } from './weather/weather.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([UsersEffects]),
    UsersModule,
    ProfileModule,
    FeedModule,
    WeatherModule
  ],
  providers: [AuthGuard, ProfileResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
