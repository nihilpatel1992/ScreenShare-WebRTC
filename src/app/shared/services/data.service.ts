import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class DataService {

  public sourceoffset: any;
  public startButtonDisabled: boolean;
  public localVideo: any;
  public showSharedScreen: boolean;

  private screenShareDataSource = new BehaviorSubject<any>(null);
  screenShareEventData = this.screenShareDataSource.asObservable();

  constructor() {
    this.startButtonDisabled = false;
    this.showSharedScreen = false;
  }

  invokeRemoteScreenShare(data: any) {
    this.screenShareDataSource.next(data);
  }

}
