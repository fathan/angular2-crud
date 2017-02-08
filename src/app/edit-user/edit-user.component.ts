import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { User } from './../user';
import { UserService } from './../user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  providers: [ UserService ]
})
export class EditUserComponent implements OnInit {
  getuser: User;
  user: User = new User;
  errors: Object = {};
  userForm: FormGroup;
  submitEnabled : boolean = false;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _fb: FormBuilder,
    private _location: Location
  ) {
    this.userForm = this._fb.group({
      id: '',
      name: '',
      email: '',
      password_digest: '',
      company_id: '',
      role_id: '',
    });
  }

  ngOnInit() {
    this.getUser();
    this._route.data.subscribe(
      (data: {user: User}) => {
        if (data.user) {
          this.user = data.user;
          this.userForm.patchValue(data.user);
        }
      }
    );
  }

  getUser() {
    this._route.params.subscribe(params => {
      let id = +params['id'];
      this._userService.getUserById(id).subscribe(user => this.getuser = user)
    })
  }

  updateUser() {
    this.objectUser(this.userForm.value);
    this._userService
    .updateUser(this.user)
    .subscribe(
      user => this._router.navigateByUrl('/'),
      err => {
        this.errors = err;
      }
    );
  }

  objectUser(values: Object) {
    (<any>Object).assign(this.user, values);
  }

  goBack(): void {
    this._location.back();
  }
}
