import { SearchPipe } from './../search.pipe';
import { Router } from '@angular/router';
import { User } from './../user';
import { UserService } from './../user.service';
import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-index-user',
  templateUrl: './index-user.component.html',
  styleUrls: ['./index-user.component.scss'],
  providers: [UserService, SearchPipe],
  changeDetection: ChangeDetectionStrategy.Default
})

export class IndexUserComponent implements OnInit {
  constructor(
    private _router: Router,
    private _userService: UserService
  ) { }

  searchData: string = '';
  response: string;
  users: User[];

  ngOnInit() {
    this._userService.getUser()
      .subscribe(
        users => this.users = users,
        error => { console.log(error); }
      );
  }

  onDelete(user: User) {
    if (confirm('Are you sure you want to delete user ' + user.id + "?")) {
      this._userService.deleteUser(user.id)
        .subscribe(
          success => this._router.navigateByUrl('/'),
          error => {
            console.log(error);
          }
        );
      this._router.navigateByUrl('*');
    }
  }
}
