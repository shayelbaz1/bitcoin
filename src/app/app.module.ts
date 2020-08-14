import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { ContactDetailComponent } from './pages/contact-detail/contact-detail.component';
import { MessagesComponent } from './components/messages/messages.component';
import { HomePage } from './pages/home-page/home-page.component';
import { ContactSearchComponent } from './components/contact-search/contact-search.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactEditComponent } from './components/contact-edit/contact-edit.component';
import { ChartsComponent } from './pages/charts/charts.component';
import { SignupComponent } from './pages/signup/signup.component';
import { MoveListComponent } from './components/move-list/move-list.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ContactDetailComponent,
    MessagesComponent,
    HomePage,
    ContactSearchComponent,
    ContactListComponent,
    ContactEditComponent,
    ChartsComponent,
    SignupComponent,
    MoveListComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
