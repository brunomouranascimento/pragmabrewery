import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as Material from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material.MatTooltipModule,
    Material.MatButtonModule,
    Material.MatIconModule,
    Material.MatListModule,
    Material.MatMenuModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatDialogModule,
    Material.MatSnackBarModule,
    Material.MatBadgeModule,
    Material.MatSlideToggleModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatCheckboxModule
  ],
  exports: [
    Material.MatTooltipModule,
    Material.MatButtonModule,
    Material.MatIconModule,
    Material.MatListModule,
    Material.MatMenuModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatDialogModule,
    Material.MatSnackBarModule,
    Material.MatBadgeModule,
    Material.MatSlideToggleModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatCheckboxModule
  ]
})
export class MaterialModule { }
