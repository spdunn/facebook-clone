import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { UsersRoutingModule } from "./users-routing.module";
import { UsersComponent } from "./users.component";

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    CommonModule
  ]
})
export class UsersModule {};
