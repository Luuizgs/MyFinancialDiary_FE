import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { v4 as Guidv4 } from 'uuid';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  public username: string;
  public password: string;
  public showPassword: boolean = false;
  public invalidUsername: boolean = false;
  public invalidPassword: boolean = false;

  private _username: string = 'Admin';
  private _password: string = 'ps123456';

  constructor(private primengConfig: PrimeNGConfig, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  public showPass() {
    this.showPassword = !this.showPassword;
  }

  public login() {
    if (this.username === this._username && this.password === this._password) {
      let token:string = Guidv4();
      localStorage.setItem('token', token);
      this.router.navigate(['/in/home']);
    }
    else
    {
      this.invalidUsername = this.invalidPassword = true;
      this.messageService.add({ key: 'invalidLogin', severity: 'error', summary: 'Error', detail: 'Username or Password are invalid.' });
    }
  }

}
