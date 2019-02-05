import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Driver } from 'src/app/models/driver';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  driver: any;
  notifications: any;
  driverData: any;
  private showLogin = new BehaviorSubject<boolean>(true);

  constructor(private angularFireAuth: AngularFireAuth, private angularFirestore: AngularFirestore, private router: Router) {
    this.angularFireAuth.authState.subscribe(data => {
      if (data) {
        this.driverData = data;
        localStorage.setItem('driver', JSON.stringify(data));
        localStorage.setItem('email', data.email);
        localStorage.setItem('uid', data.uid);

      } else {
        localStorage.setItem('driver', null);
      }
    });
  }

  async login(driverData: Driver) {
    try {
      await this.angularFireAuth.auth.signInWithEmailAndPassword(driverData.email, driverData.password);
      this.router.navigate(['']);
    } catch (error) {
      window.alert(`Error!${error.message}`);
    }
  }

  async logout() {
    await this.angularFireAuth.auth.signOut();
    localStorage.removeItem('driver');
    localStorage.removeItem('email');
    localStorage.removeItem('notifications');
    this.router.navigate(['login']);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('driver'));
    return user !==  null;
  }

  get isShowLogin() {
    return this.showLogin.asObservable();
  }

  getDriver() {
    this.driver = this.angularFirestore.collection('drivers', ref => ref
      .where('email', '==', localStorage.getItem('email'))).valueChanges();
    return this.driver;
  }

  getNotifications() {
    this.notifications = this.angularFirestore.collection('notifications', ref => ref
    .where('uid', '==', localStorage.getItem('uid') ))
      .valueChanges();
    return this.notifications;
  }

}
