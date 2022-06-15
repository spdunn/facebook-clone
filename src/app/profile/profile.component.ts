import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  profileUser;
  profileSub: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.profileSub = this.route.data.subscribe(
      (data: Data) => {
        this.profileUser = data['profileData'];
        console.log("Profile Data: ", this.profileUser);
      }
    )
  }

  ngOnDestroy(): void {
    this.profileSub.unsubscribe();
  }

}
