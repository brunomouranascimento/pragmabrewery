import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ElementRef } from '@angular/core';

import { FirebaseService } from 'src/app/services/firebase.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Beer } from 'src/app/models/beer';
import { Driver } from 'src/app/models/driver';
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

  travelTime = 60000;
  deliveriesCount = 0;
  tripMode = false;

  deliver = {
    message: `Truck door's are opened, so the temperature of all containers rises 2 degrees.
              The temperatures will now automatically adjust to the ideal.`,
    deliverCount: 0
  };

  timeElapssed = 0;
  interval: any;

  constructor(
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog,
    public truck: ElementRef) { }

  startTrip(trip) {
    this.gotoTruck();
    this.deliver.message = `Truck door's are opened, so the temperature of all containers rises 2 degrees.
                            The temperatures will now automatically adjust to the ideal.`;
    this.startCronometer();
    this.tripMode = true;
    this.deliveriesCount ++;
    setTimeout(() => {
      this.pauseCronometer();
      this.beers.forEach(beer => {
        beer.idealTemp += 2;
      });
      this.deliver.deliverCount ++;
      // tslint:disable-next-line:max-line-length
      const dialogRef = this.dialog.open(DeliverNotificationComponent, { width: '350px', data: this.deliver });
      dialogRef.afterClosed().subscribe(result => {
        if (this.deliveriesCount < trip.plannedStops) {
          this.beers.forEach(beer => {
            beer.idealTemp -= 2;
          });
          this.startTrip(trip);
        } else {
          this.tripMode = false;
          this.deliver.deliverCount = 0;
          this.deliver.message = 'Deliveries finished';
          this.dialog.open(DeliverNotificationComponent, { data: this.deliver });
          this.beers.forEach(beer => {
            beer.idealTemp -= 2;
          });
          this.deliveriesCount = 0;
          this.timeElapssed = 0;
        }
      });
    }, (this.travelTime / trip.plannedStops));
  }

  getTripMessage() {
    if (this.tripMode === false) {
      return 'START TRIP';
    }
    return `DRIVING | Travel time elapssed: ${this.timeElapssed} minutes` ;
  }

  getDeliveriesMessage() {
    return this.tripForm.get('plannedStops').hasError('max') ? 'The maximum of stops is 6' :
          this.tripForm.get('plannedStops').hasError('required') ? 'At least one deliver must be made' : '';
  }

  startCronometer() {
    this.interval = setInterval(() => {
      if (this.timeElapssed < (this.travelTime / 1000)) {
        this.timeElapssed++;
      } else {
        this.timeElapssed = 0;
      }
    }, 1000);
  }

  pauseCronometer() {
    clearInterval(this.interval);
  }

  gotoTruck() {
    this.truck.nativeElement.querySelector('.charge').scrollIntoView({behavior: 'smooth'});
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
