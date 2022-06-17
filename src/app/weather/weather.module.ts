import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { WeatherRoutingModule } from "./weather-routing.module";
import { WeatherComponent } from "./weather.component";

@NgModule({
  declarations: [
    WeatherComponent
  ],
  imports: [
    RouterModule,
    WeatherRoutingModule
  ]
})
export class WeatherModule {}
