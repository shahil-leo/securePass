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

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
