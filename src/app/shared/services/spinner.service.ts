import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private isloading$: BehaviorSubject<boolean> = new BehaviorSubject(false)
  isLaodingObs$ = this.isloading$.asObservable()

  constructor() { }
  emitLoadingObs$(flag: boolean) {
    this.isloading$.next(flag)
  }
}
