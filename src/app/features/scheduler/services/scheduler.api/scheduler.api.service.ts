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

  private transformTimestampToDate(date: Timestamp): Date {
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
            startDate: this.transformTimestampToDate(reservation.startDate as Timestamp),
            endDate: this.transformTimestampToDate(reservation.endDate as Timestamp),
          }
        })
      )
    );
  };

  public addReservation(reservation: Reservation): Observable<DocumentReference<DocumentData, DocumentData>> {
    return from(addDoc(this.firebaseCollection, reservation));
  }
}
