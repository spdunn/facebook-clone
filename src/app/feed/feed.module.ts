import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FeedRoutingModule } from "./feed-routing.module";
import { FeedComponent } from "./feed.component";

@NgModule({
  declarations: [FeedComponent],
  imports: [
    RouterModule,
    CommonModule,
    FeedRoutingModule,
    FormsModule
  ]
})
export class FeedModule {}
