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
import { AuthGuard } from './services/auth.guard';
import { PasswordGeneratorComponent } from './pages/password-generator/password-generator.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'register-site', component: RegisterSiteComponent, canActivate: [AuthGuard] },
  { path: 'register-password/:id/:data', component: RegisterPasswordComponent },
  { path: 'all-pass', component: AllPassComponent, canActivate: [AuthGuard] },
  { path: 'note', component: NotesComponent, canActivate: [AuthGuard] },
  { path: 'generate-password', component: PasswordGeneratorComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
