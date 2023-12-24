import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserListFilterLabelPipe } from './shared/pipes/user-list-filter-label.pipe';
import { UserListTableComponent } from './user/user-list/user-list-table.component';
import { UsersPageComponent } from './user/users-page.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { FormatDatePipe } from './shared/pipes/format-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UserListTableComponent,
    UsersPageComponent,
    UserDetailsComponent,
    FormatDatePipe,
    UserListFilterLabelPipe,
    UserFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSortModule,
    MatButtonModule,
    MatFormFieldModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
