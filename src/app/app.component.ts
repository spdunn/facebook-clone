import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { map, Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'FacebookApp';
  // sub: Subscription;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigate([''])

    // rxjs operators practice
    // const obs: Observable<number> = of(1, 2, 3);
    // this.sub = map(i => +i - 20)(obs)
    //   .subscribe(data => console.log(data));
    // obs.pipe(map(i => 1000))
    // // this.sub = obs.subscribe(data => console.log(data))
    // map(i => +i + 2)(obs);
    // obs.pipe(map(i => i * i))
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }
}
