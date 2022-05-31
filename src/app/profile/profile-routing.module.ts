import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { ProfileComponent } from "./profile.component";
import { ViewProfileComponent } from "./view-profile/view-profile.component";

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
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