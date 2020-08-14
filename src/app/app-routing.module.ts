import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { ChartsComponent } from './pages/charts/charts.component';
import { HomePage } from './pages/home-page/home-page.component';
import { ContactDetailComponent } from './pages/contact-detail/contact-detail.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ContactEditComponent } from './components/contact-edit/contact-edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'contacts',
    component: ContactsComponent
  },
  {
    path: 'statistics',
    component: ChartsComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'detail/:id',
    component: ContactDetailComponent
  },
  {
    path: 'edit',
    component: ContactEditComponent
  },
  {
    path: 'edit/:id',
    component: ContactEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
  
export class AppRoutingModule { }