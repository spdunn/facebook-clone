import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  {path: "", redirectTo: "/auth", pathMatch: "full"},
  {path: "auth", component: LoginComponent},
  {path: "feed", loadChildren: () => import(`./feed/feed.module`).then(m => m.FeedModule)},
  {path: "profile", loadChildren: () => import(`./profile/profile.module`).then(m => m.ProfileModule)},
  {path: "connect", loadChildren: () => import(`./users/users.module`).then(m => m.UsersModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
