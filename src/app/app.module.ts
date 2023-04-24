import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { HeroSectionComponent } from './layouts/hero-section/hero-section.component';
import { HomeComponent } from './pages/home/home.component';
import { FeaturesComponent } from './layouts/features/features.component';
import { UpdatesComponent } from './layouts/updates/updates.component';
import { PricingComponent } from './layouts/pricing/pricing.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RegisterSiteComponent } from './pages/register-site/register-site.component';
import { RegisterPasswordComponent } from './pages/register-password/register-password.component';
import { AllPassComponent } from './pages/all-pass/all-pass.component';
import { NotesComponent } from './pages/notes/notes.component';
import { PasswordGeneratorComponent } from './pages/password-generator/password-generator.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeroSectionComponent,
    HomeComponent,
    FeaturesComponent,
    UpdatesComponent,
    PricingComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    RegisterSiteComponent,
    RegisterPasswordComponent,
    AllPassComponent,
    NotesComponent,
    PasswordGeneratorComponent,
    NotFoundComponent,

  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
