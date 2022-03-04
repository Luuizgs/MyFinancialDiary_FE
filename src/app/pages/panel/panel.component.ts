import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-home',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  spinnerStatus: boolean = false;

  constructor(private spinnerService: SpinnerService, private router: Router) { }

  ngOnInit(): void {
  }

  async pageToLoad(valor: string) {
    const pageToLoad = valor;
    await this.spinnerService.turnOnSpinner();
    this.spinnerStatus = this.spinnerService.spinnerStatus; 
    await this.spinnerService.turnOffSpinner();
    setTimeout( () => {
      this.spinnerStatus = this.spinnerService.spinnerStatus;
      if (pageToLoad == 'home') this.router.navigateByUrl(`in/${pageToLoad}`);
    }, 2000);
  }
}
