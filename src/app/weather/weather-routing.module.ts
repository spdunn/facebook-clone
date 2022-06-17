import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth-guard.service";
import { WeatherComponent } from "./weather.component";

const routes: Routes = [
  {path: '', canActivate: [AuthGuard], component: WeatherComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherRoutingModule {}
