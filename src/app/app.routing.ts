import { Routes, RouterModule } from '@angular/router';
import { IndexUserComponent } from './index-user/index-user.component';
import { NewUserComponent } from './new-user/new-user.component';
import { ShowUserComponent } from './show-user/show-user.component';
import { PageNotFoundComponent } from './page-not-found.component';

export const routes: Routes = [
  { path: 'list-user', component: IndexUserComponent },
  { path: 'new-user', component: NewUserComponent },
  { path: 'show-user/:id', component: ShowUserComponent },
  { path: '**', component: PageNotFoundComponent }
];
