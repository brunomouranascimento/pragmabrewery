import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../@material/material.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { ContainerComponent } from './container/container.component';
import { NotificationCenterComponent } from './notification-center/notification-center.component';
import { HeaderComponent } from './header/header.component';
import { NotificationComponent } from './notification/notification.component';
import { DeliverNotificationComponent } from './deliver-notification/deliver-notification.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    PerfectScrollbarModule
  ],
  exports: [
    MaterialModule,
    PerfectScrollbarModule,
    ContainerComponent,
    NotificationCenterComponent,
    HeaderComponent,
    NotificationComponent,
    DeliverNotificationComponent
  ],
  declarations: [
    ContainerComponent,
    NotificationCenterComponent,
    HeaderComponent,
    NotificationComponent,
    DeliverNotificationComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class ComponentsModule { }
