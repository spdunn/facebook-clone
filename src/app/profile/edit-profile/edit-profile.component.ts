import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { User } from 'src/app/shared/user.model';
import { UpdateUser } from 'src/app/users/store/users.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  email: string;
  profileForm: FormGroup;
  userSub: Subscription;
  user: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.userSub = this.store.select('users').subscribe((users) => {
      console.log('updating user in edit-profile', users);
      this.user = users.currentUser;
    });
    this.initForm();
  }

  onSubmit() {
    console.log(this.email, this.profileForm.value);
    const updatedUser : User = {
      ...this.user,
      firstName: this.profileForm.value.firstName,
      lastName: this.profileForm.value.lastName,
      email: this.profileForm.value.email,
      profileImage: this.profileForm.value.profileImage
    };
    this.store.dispatch(new UpdateUser(updatedUser));
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['/profile/' + this.user.id]);
  }

  private initForm() {
    this.email = this.user.email;

    this.profileForm = new FormGroup({
      firstName: new FormControl(this.user.firstName, Validators.required),
      lastName: new FormControl(this.user.lastName, Validators.required),
      profileImage: new FormControl(this.user.profileImage),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email,
      ]),
    });
  }
}
