import { LoadingService } from './loading.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

export interface LoadState {
  show: boolean;
}

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss']
})
export class LoadingScreenComponent implements OnInit, OnDestroy {

  public show = false;
  private subscription: Subscription;


  constructor(private loadingService: LoadingService) { }

  ngOnInit() {
    this.subscription = this.loadingService.loadingState.subscribe(
      (state: LoadState) => {
        console.log(state);
        this.show = state.show;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
