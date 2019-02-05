import { Component, OnInit, Input, Output, EventEmitter, DoCheck, IterableDiffers, } from '@angular/core';


import { Notification } from 'src/app/models/notification';
import { DaytimeService } from 'src/app/services/daytime.service';
import { AuthenticationService } from './../../authentication/authentication.service';

@Component({
  selector: 'app-notification-center',
  templateUrl: './notification-center.component.html',
  styleUrls: ['./notification-center.component.scss']
})
export class NotificationCenterComponent implements OnInit, DoCheck {

  @Input() isActive: boolean;
  @Output() close = new EventEmitter<boolean>();
  @Output() notification$ = new EventEmitter<number>();

  notificationsCount: number;
  notifications: Notification[];
  now: string;
  abbreviation: string;
  selectedDate: any;

  todayTabActive = true;
  notificationsTabActive = false;
  iterableDiffer: any;

  constructor(
    private _iterableDiffers: IterableDiffers,
    private authenticationService: AuthenticationService,
    private daytimeService: DaytimeService ) {
      this.iterableDiffer = this._iterableDiffers.find([]).create(null);
    }

  toggleTodayTab() {
    this.todayTabActive = true;
    this.notificationsTabActive = false;
  }

  toggleNotificationsTab() {
    this.notificationsTabActive = true;
    this.todayTabActive = false;
  }

  closeNotificationCenter(close: boolean) {
    this.close.emit(close);
  }

  dismissNotification(notification) {
    this.notifications.splice(this.notifications.indexOf(notification), 1);
  }

  onSelect(event) {
    this.selectedDate = event;
  }

  ngOnInit() {
    this.now = this.daytimeService.getDaytTime();
    this.abbreviation = this.daytimeService.getAbbreviation();
    this.authenticationService.getNotifications().subscribe(notifications => {
      this.notifications = notifications as Notification[];
      this.notificationsCount = this.notifications.length;
      this.notification$.emit(this.notificationsCount);
    });
  }

  ngDoCheck() {
    const changes = this.iterableDiffer.diff(this.notifications);
    if (changes) {
      this.notificationsCount = this.notifications.length;
      this.notification$.emit(this.notificationsCount);
    }
  }
}
