import { Component, OnInit } from '@angular/core';

import { FirebaseService } from 'src/app/services/firebase.service';
import { Beer } from 'src/app/models/beer';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  beers: Beer[];

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getBeers().subscribe(beers => {
      this.beers = beers as Beer[];
      console.log(this.beers);
    });
  }

}
