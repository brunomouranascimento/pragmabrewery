import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DaytimeService {

  today = new Date();
  dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  constructor() { }

  getAbbreviation() {
    if ((this.today.getDate().toString().substr(1, 2) === '1') || (this.today.getDate().toString().substr(0, 1) === '1')) {
      return 'st';
    } else if ((this.today.getDate().toString().substr(1, 2) === '2') || (this.today.getDate().toString().substr(0, 1) === '2')) {
      return 'nd';
    } else if ((this.today.getDate().toString().substr(1, 2) === '3') || (this.today.getDate().toString().substr(0, 1) === '3')) {
      return 'rd';
    } else {
      return 'th';
    }
  }

  getDaytTime() {
    return `${(this.dayName[this.today.getDay()])},
    ${this.monthName[this.today.getMonth()]} ${this.today.getDate()}`;
  }
}
