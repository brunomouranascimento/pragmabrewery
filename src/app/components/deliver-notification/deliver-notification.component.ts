import { Beer } from './../../models/beer';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-deliver-notification',
  templateUrl: './deliver-notification.component.html',
  styleUrls: ['./deliver-notification.component.scss']
})
export class DeliverNotificationComponent implements OnInit {

  beers: Beer[];

  constructor(
    public dialogRef: MatDialogRef<DeliverNotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public deliver,
    public snackBar: MatSnackBar) { }

  onDeliveriesFinished() {
    this.dialogRef.close();
  }

  gotIt() {
    this.dialogRef.close();
    this.openSnackBar('TEMPERATURES WERE ADJUSTED', 'OK');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnInit() {
  }

}
