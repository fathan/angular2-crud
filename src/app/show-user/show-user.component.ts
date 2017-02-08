import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { User } from './../user';
import { UserService } from './../user.service';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.scss'],
  providers: [ UserService ]
})
export class ShowUserComponent implements OnInit {
  user : User

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this._route.params.subscribe(params => {
      let id = +params['id'];
      this._userService.getUserById(id).subscribe(user => this.user = user)
    })
  }

  goBack(): void {
    this._location.back();
  }

}
