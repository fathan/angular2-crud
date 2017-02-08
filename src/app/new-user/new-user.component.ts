import { UserService } from './../user.service';
import { User } from './../user';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute }   from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
  providers: [ UserService ]
})
export class NewUserComponent implements OnInit {
  user: User = new User;
  errors: Object = {};
  userForm: FormGroup;
  submitEnabled : boolean = false;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _fb: FormBuilder
  ) {
    this.userForm = this._fb.group({
      name: '',
      email: '',
      password_digest: '',
      company_id: '',
      role_id: '',
    });
  }

  ngOnInit() {
    this._route.data.subscribe(
      (data: {user: User}) => {
        if (data.user) {
          this.user = data.user;
          this.userForm.patchValue(data.user);
        }
      }
    );
  }

  saveUser() {
    this.objectUser(this.userForm.value);
    this._userService
    .postUser(this.user)
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
}
