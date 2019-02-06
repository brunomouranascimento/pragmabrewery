import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-thermostat',
  templateUrl: './thermostat.component.html',
  styleUrls: ['./thermostat.component.scss']
})
export class ThermostatComponent implements OnInit, AfterViewInit {

  temp = 19;
  maxTemp = 34;
  minTemp = 2;

  @ViewChild('number') number: ElementRef;
  @ViewChild('shadowBar') shadowBar: ElementRef;
  @ViewChild('fill') fill: ElementRef;
  @ViewChild('fill1') fill1: ElementRef;
  @ViewChild('fill2') fill2: ElementRef;


  constructor() { }

  updateTemp () {
    this.number.nativeElement.style.transform = 'translate(-50%, -50%) rotate(' + (-180 + this.temp * 10) + 'deg)';
    this.shadowBar.nativeElement.style.transform = 'translate(-50%, -50%) rotate(' + (-180 + this.temp * 10) + 'deg)';
    this.shadowBar.nativeElement.style.animation = 'none';
    this.fill.nativeElement.style.animation = 'none';
  }

  increaseTemp() {
    if (this.temp < this.maxTemp) {
    this.temp++;
    this.updateTemp();
    }
    if (this.temp > 19) {
      this.fill1.nativeElement.style.transform = 'rotate(' + (this.temp - 18) * 10 + 'deg)';
      this.fill1.nativeElement.style.trasitionDelay = '0s';
    } else if (this.temp === 19) {
      this.fill2.nativeElement.style.transform = 'rotate(' + (this.temp - 18) * 10 + 'deg)';
      this.fill2.nativeElement.style.trasitionDelay = '1s';
    } else {
      this.fill2.nativeElement.style.transform = 'rotate(' + this.temp * 10 + 'deg)';
      this.fill2.nativeElement.style.trasitionDelay = '0s';
    }
    return this.temp;
  }

  decreaseTemp() {
    if (this.temp > this.minTemp) {
      this.temp--;
      this.updateTemp();

      if (this.temp >= 18) {
        this.fill1.nativeElement.style.transform = 'rotate(' + (this.temp - 18) * 10 + 'deg)';
        this.fill1.nativeElement.style.trasitionDelay = '0s';
      } else if (this.temp === 17) {
        this.fill2.nativeElement.style.transform = 'rotate(' + this.temp * 10 + 'deg)';
        this.fill2.nativeElement.style.trasitionDelay = '0.5s';

      } else {
        this.fill2.nativeElement.style.transform = 'rotate(' + this.temp * 10 + 'deg)';
        this.fill2.nativeElement.style.trasitionDelay = '0s';
      }
    }
    return this.temp;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log(this.number.nativeElement);
  }
}
