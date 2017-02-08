import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { IndexUserComponent } from './index-user/index-user.component';
import { NewUserComponent } from './new-user/new-user.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { ShowUserComponent } from './show-user/show-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { SearchPipe } from './search.pipe';

const appRoutes: Routes = [
  { path: '', component: IndexUserComponent, pathMatch: 'full' },
  { path: 'new-user', component: NewUserComponent },
  { path: 'edit-user/:id', component: EditUserComponent },
  { path: 'show-user/:id', component: ShowUserComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    IndexUserComponent,
    NewUserComponent,
    ShowUserComponent,
    EditUserComponent,
    PageNotFoundComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),

  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
