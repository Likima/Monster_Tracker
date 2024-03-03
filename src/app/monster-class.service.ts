import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonsterClass {
  constructor(
    @Inject('name') public name: string,
    @Inject('location') public location: string,
    @Inject('latitude') public latitude: number,
    @Inject('longitude') public longitude: number,
    @Inject('description') public description: string,
    @Inject('image') public image: string,
    @Inject('status') public status: string,
    @Inject('id') public id: number,
    @Inject('timeReported') public timeReported: string,
    @Inject('reportedBy') public reportedBy: string,
    @Inject('phoneNumber') public phoneNumber: string,
  ) {}
}

