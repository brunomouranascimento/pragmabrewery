import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { FirebaseService } from 'src/app/services/firebase.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Beer } from 'src/app/models/beer';
import { Driver } from 'src/app/models/driver';

@Component({
  selector: 'app-truck',
  templateUrl: './truck.component.html',
  styleUrls: ['./truck.component.scss']
})
export class TruckComponent implements OnInit {

  tripForm: FormGroup;
  beers: Beer[];
  driver$: Driver;
  tripDriver: Driver;

  constructor(
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.firebaseService.getBeers().subscribe(beers => {
      this.beers = beers as Beer[];
    });

    if (localStorage.getItem('uid')) {
      this.authenticationService.getDriver().subscribe(data => {
        this.driver$ = data;
        data.forEach(driver => {
          this.tripDriver = driver;
        });
        this.tripForm = this.formBuilder.group({
          driverName: [{value: this.tripDriver.name, disabled: true}, Validators.required],
          email: [{value: this.tripDriver.email, disabled: true}, Validators.compose([Validators.email, Validators.required])],
          occupation: [{value: this.tripDriver.occupation, disabled: true}, Validators.required],
          phone: [{value: this.tripDriver.phone, disabled: true}, Validators.required],
          emergencyPhone: [this.tripDriver.emergencyPhone],
          beers: ['teste2', Validators.required]
        });
      });
    }

    this.tripForm = this.formBuilder.group({
      driverName: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      occupation: ['', Validators.required],
      phone: ['', Validators.required],
      emergencyPhone: [''],
      beers: [ [] , Validators.required]
    });
  }
}
