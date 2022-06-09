import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth-guard.service";
import { FeedComponent } from "./feed.component";

const routes: Routes = [
  {path: '', canActivate: [AuthGuard], component: FeedComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedRoutingModule {}
