import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { FirebaseUserModel } from '../core/user.model';
import { UserService } from '../core/user.service';

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.scss'],
})
export class UserComponent implements OnInit {

  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
  ) {

  }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      const data = routeData['prefetch'];
      if (data) {
        this.user = data;
        this.createForm(this.user.name);
      }
    });
  }

  createForm(name) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required],
    });
  }

  save(value) {
    this.userService.updateCurrentUser(value)
        .then(res => {
          console.log(res);
        }, err => console.log(err));
  }

  logout() {
    this.authService.doLogout()
        .then((res) => {
          this.location.back();
        }, (error) => {
          console.log('Logout error', error);
        });
  }
}
