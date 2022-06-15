import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth-guard.service";

import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { ProfileResolver } from "./profile-resolver.service";
import { ProfileComponent } from "./profile.component";
import { ViewProfileComponent } from "./view-profile/view-profile.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ProfileComponent,
    resolve: {profileData: ProfileResolver},
    children: [
      {path: ':id', component: ViewProfileComponent},
      {path: ':id/edit', component: EditProfileComponent}
    ]
  }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule {}
