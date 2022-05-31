import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  {path: "", redirectTo: "/auth", pathMatch: "full"},
  {path: "auth", component: LoginComponent},
  {path: "feed", component: FeedComponent},
  {path: "profile", loadChildren: () => import(`./profile/profile.module`).then(m => m.ProfileModule)},
  {path: "connect", loadChildren: () => import(`./users/users-routing.module`).then(m => m.UsersRoutingModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
