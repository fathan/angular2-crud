import { User } from './user';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe',
  pure: false
})
export class SearchPipe implements PipeTransform {
  public transform(users: User[], expression:string): any {
    if (!expression) {
      return users;
    }
    else {
      return users.filter((usr: User) => usr.name.toLowerCase().indexOf(expression) != -1)
    }
  }
}
