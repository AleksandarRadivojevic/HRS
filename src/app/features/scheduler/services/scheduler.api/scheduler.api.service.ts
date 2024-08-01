import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, DocumentData, DocumentReference, Firestore, Timestamp } from '@angular/fire/firestore';
import { Reservation } from '../../interfaces/reservation.interface';
import { from, map, Observable } from 'rxjs';

@Injectable()
export class SchedulerApiService {

  private firestore: Firestore = inject(Firestore);
  private readonly tableName = 'reservation';

  private firebaseCollection = collection(this.firestore, this.tableName);
  private firebaseCollectionData = collectionData<Reservation>(this.firebaseCollection as CollectionReference<Reservation, DocumentData>);

  // TODO: Fix types
  private transformDateToTimestamp(date: any): any {
    // format date from firebase Timestamp to js Date
    const { seconds: startSeconds, nanoseconds: startNanoseconds } = date;
    return new Timestamp(startSeconds, startNanoseconds).toDate();
  };


  public getAllReservations(): Observable<Reservation[]> {
    return this.firebaseCollectionData.pipe(
      map((res: Reservation[]) =>
        res.map((reservation: Reservation) => {
          return {
            ...reservation,
            startDate: this.transformDateToTimestamp(reservation.startDate),
            endDate: this.transformDateToTimestamp(reservation.endDate),
          }
        })
      )
    );
  };

  public addReservation(reservation: Reservation): Observable<DocumentReference<DocumentData, DocumentData>> {
    return from(addDoc(this.firebaseCollection, reservation));
  }
}
