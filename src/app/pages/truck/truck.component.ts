import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { FirebaseService } from 'src/app/services/firebase.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Beer } from 'src/app/models/beer';
import { Driver } from 'src/app/models/driver';
import { timer, Subject } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { DeliverNotificationComponent } from 'src/app/components/deliver-notification/deliver-notification.component';

@Component({
  selector: 'app-truck',
  templateUrl: './truck.component.html',
  styleUrls: ['./truck.component.scss']
})
export class TruckComponent implements OnInit {

  tripForm: FormGroup;
  beers: Beer[];
  tripDriver: Driver;

  travelTime = 10000;
  deliveriesCount = 0;
  tripMode = false;

  timeLeft = this.travelTime / 1000;
  interval: any;

  constructor(
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog) { }

  startTrip(trip) {

    this.startTimer();
    this.tripMode = true;
    this.deliveriesCount ++;
    setTimeout(() => {
      this.pauseTimer();
      const dialogRef = this.dialog.open(DeliverNotificationComponent, { data: this.deliveriesCount });
      dialogRef.afterClosed().subscribe(result => {
        if (this.deliveriesCount < trip.plannedStops) {
          this.startTrip(trip);
        } else {
          this.tripMode = false;
          this.dialog.open(DeliverNotificationComponent, { data: 'Deliveries finished' });
          this.deliveriesCount = 0;
          this.timeLeft = this.travelTime / 1000;
        }
      });
    }, (this.travelTime / trip.plannedStops));
  }

  getTripMessage() {
    if (this.tripMode === false) {
      return 'START TRIP';
    }
    return 'DRIVING';
  }

  getDeliveriesMessage() {
    return this.tripForm.get('plannedStops').hasError('max') ? 'The maximum of stops is 6' :
          this.tripForm.get('plannedStops').hasError('required') ? 'At least one deliver must be made' : '';
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  ngOnInit() {
    this.firebaseService.getBeers().subscribe(beers => {
      this.beers = beers as Beer[];
    });

    if (localStorage.getItem('uid')) {
      this.authenticationService.getDriver().subscribe(data => {
        data.forEach(driver => {
          this.tripDriver = driver;
        });
        this.tripForm = this.formBuilder.group({
          driverName: [{value: this.tripDriver.name, disabled: true}, Validators.required],
          email: [{value: this.tripDriver.email, disabled: true}, Validators.compose([Validators.email, Validators.required])],
          occupation: [{value: this.tripDriver.occupation, disabled: true}, Validators.required],
          phone: [{value: this.tripDriver.phone, disabled: true}, Validators.required],
          plannedStops: [1, Validators.compose([Validators.max(6), Validators.required])]
        });
      });
    }

    this.tripForm = this.formBuilder.group({
      driverName: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      occupation: ['', Validators.required],
      phone: ['', Validators.required],
      plannedStops: [1, Validators.min(1)]
    });
  }
}
