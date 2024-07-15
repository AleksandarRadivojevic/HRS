import { Injectable } from '@angular/core';
import { db } from '../../../configs/firebase.config';
import { EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { SchedulerConfig } from '../interfaces/scheduler-config.interface';
import { deleteDoc, updateDoc, Timestamp, addDoc, doc, getDocs, getDoc, collection, query, QuerySnapshot, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { Reservation } from '../interfaces/reservation.interface';

@Injectable()
export class SchedulerConfigService {

  private tableName: string = "reservation";

  public config: SchedulerConfig = {
    minDate: new Date().setDate(new Date().getDate() - 1),
    view: {
      current: 'Month',
      all: ['Week', 'Month', 'Agenda']
    }
  };

  // TEMPORARY - Will replace from response from API
  public data: Record<string, any>[] = [
    // {
    //   id: 'abc-0123',
    //   fullName: 'Meeting',
    //   startDate: new Date(2024, 6, 15),
    //   endDate: new Date(2024, 6, 18),
    //   isAllDay: true,
    //   // isReadonly: true,
    //   // IsBlock: true,
    //   specialRequests: 'Hello from here!'
    // }
  ];

  public eventSettings: EventSettingsModel = {
    dataSource: this.data,
    enableTooltip: true,
    fields: {
      subject: { name: 'fullName' },
      startTime: { name: 'startDate' },
      endTime: { name: 'endDate' },
      description: { name: 'specialRequests' },
    }
  };

  public async getAllReserevations() {
    const clientsRef = collection(db, this.tableName);
    const q = query(clientsRef);

    try {
      const querySnapshot: QuerySnapshot = await getDocs(q);

      querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {

        // format date from firebase Timestamp to js Date
        const { seconds: startSeconds, nanoseconds: startNanoseconds } = doc.data()?.['startDate'];
        const { seconds: endSeconds, nanoseconds: endNanoseconds } = doc.data()?.['endDate'];
        const startDate = new Timestamp(startSeconds, startNanoseconds).toDate();
        const endtDate = new Timestamp(endSeconds, endNanoseconds).toDate();

        this.data.push({
          id: doc.id,
          fullName: doc.data()?.['fullName'],
          startDate: startDate,
          endDate: endtDate,
          specialRequests: doc.data()?.['specialRequests'],
          status: doc.data()?.['status'],
          isAllDay: doc.data()?.['isAllDay'],
        })
      });
    } catch (e) {
      console.warn(e)
    }

  }

  public async saveReservation(reservation: Reservation) {
    const record = { ...reservation }
    // convert js Date to firebase Timestamp
    record.startDate = Timestamp.fromDate(new Date(record.startDate.toString()));;
    record.endDate = Timestamp.fromDate(new Date(record.endDate.toString()));

    try {
      const response = await addDoc(collection(db, this.tableName), record);
      return response.id;
    } catch (e) {
      console.warn(e)
      return e;
    }
  }

}
