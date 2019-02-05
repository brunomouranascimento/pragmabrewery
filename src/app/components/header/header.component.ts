import { Component, OnInit } from '@angular/core';

import { Driver } from 'src/app/models/driver';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  driver$: Driver[];
  notificationsCount: number;

  notificationCenterOpened  = false;
  sidenavCompacted          = false;
  mobileSidenavOpened       = false;
  isLoged                   = false;

  constructor(private firebaseService: FirebaseService, public authenticationService: AuthenticationService) { }

  changeTheme(theme: string) {
    const classList = document.body.classList;
    while (classList.length > 0) {
      classList.remove(classList.item(0));
    }
    document.body.classList.add(`${theme}-theme`);
  }

  toggleNotificationCenter(open: boolean) {
    this.notificationCenterOpened = open;
  }

  onCloseNotificationCenter(closeNotificationCenter: boolean) {
    this.notificationCenterOpened = closeNotificationCenter;
  }

  onNotificationsCount(count: number) {
    this.notificationsCount = count;
  }

  ngOnInit() {
    this.authenticationService.getDriver().subscribe(data => {
      this.driver$ = data as Driver[];
    });
  }

}
