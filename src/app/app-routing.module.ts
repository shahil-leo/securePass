import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterSiteComponent } from './pages/register-site/register-site.component';
import { RegisterPasswordComponent } from './pages/register-password/register-password.component';
import { AllPassComponent } from './pages/all-pass/all-pass.component';
import { NotesComponent } from './pages/notes/notes.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'register-site', component: RegisterSiteComponent },
  { path: 'register-password/:id/:data', component: RegisterPasswordComponent },
  { path: 'all-pass', component: AllPassComponent },
  { path: 'note', component: NotesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
