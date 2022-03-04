import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  
  spinnerStatus: boolean = false;

  constructor() { }

  async turnOnSpinner(): Promise<void> {
    this.spinnerStatus = !this.spinnerStatus;
  }

  async turnOffSpinner(): Promise<void> {
    this.spinnerStatus = !this.spinnerStatus;
  }
}
