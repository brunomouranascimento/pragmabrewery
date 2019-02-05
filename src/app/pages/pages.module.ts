import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from '../components/components.module';
import { MaterialModule } from './../@material/material.module';

import { LoginComponent } from './login/login.component';
import { TruckComponent } from './truck/truck.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentsModule,
    MaterialModule,
  ],
  exports: [],
  declarations: [
    LoginComponent,
    TruckComponent
  ]
})
export class PagesModule { }
