import { LoadState } from './loading-screen.component';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {

  private loadingSubject = new Subject<LoadState>();
  public loadingState = this.loadingSubject.asObservable();


  constructor() { }

  public show() {
    this.loadingSubject.next(<LoadState>{ show: true });
  }

  public hide() {
    this.loadingSubject.next(<LoadState>{ show: false });
  }

}
