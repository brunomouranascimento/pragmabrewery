import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Beer } from '../models/beer';
import { Notification } from '../models/notification';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  beersCollection: AngularFirestoreCollection<Beer>;
  notificationsCollection: AngularFirestoreCollection<Notification>;

  beers: Observable<Beer[]>;
  notifications: Observable<Notification[]>;

  constructor(public angularFirestore: AngularFirestore) {
    this.beers = this.angularFirestore.collection('beers', ref => ref.orderBy('number', 'asc')).snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Beer;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getBeers() {
    return this.beers;
  }
}
