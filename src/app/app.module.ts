import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import 'hammerjs';
import { environment } from 'src/environments/environment';

import { ComponentsModule } from './components/components.module';
import { AppRoutingModule } from './app.routing.module';
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { AngularFireAuth } from '@angular/fire/auth';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase, 'pragramabrewery'),
    AngularFirestoreModule,
    ReactiveFormsModule,
    ComponentsModule,
    PagesModule
  ],
  providers: [AuthenticationService, AuthenticationGuard, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
