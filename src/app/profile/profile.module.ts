import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileComponent } from "./profile.component";
import { ViewProfileComponent } from "./view-profile/view-profile.component";

@NgModule({
  declarations: [
    ProfileComponent,
    ViewProfileComponent,
    EditProfileComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    CommonModule
  ]
})
export class ProfileModule {}
