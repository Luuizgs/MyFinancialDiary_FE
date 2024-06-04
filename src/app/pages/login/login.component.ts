import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { IUserStorage } from 'src/app/Interfaces/Entities/IUserStorage';
import { ILoginRequest } from 'src/app/Interfaces/Requests/ILoginRequest';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { DecodeToken } from 'src/app/utils/JwtHelper';
import { v4 as Guidv4 } from 'uuid';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;
  public showPassword: boolean = false;
  public invalidUsername: boolean = false;
  public invalidPassword: boolean = false;
  public loginRequest: ILoginRequest;

  private _username: string = 'Admin';
  private _password: string = 'ps123456';

  constructor(
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private messageService: MessageService,
    private loginService: LoginService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  public showPass() {
    this.showPassword = !this.showPassword;
  }

  public async login() {
    console.log('username', this.username);
    console.log('password', this.password);
    if (!this.password || !this.username)
      this.messageService.add({
        key: 'invalidLogin',
        severity: 'error',
        summary: 'Error',
        detail: 'Os dois campos devem ser preenchidos!',
      });

    this.loginRequest = {
      username: this.username,
      password: this.password,
    };

    const response = await this.loginService.Login(this.loginRequest);

    if (response.success) {
      const tokenValue = DecodeToken(response.token);
      console.log('Token: ', tokenValue);
      const userStorage: IUserStorage = {
        token: response.token,
        user: null
      };
      localStorage.setItem('userStorage', JSON.stringify(userStorage));
      
      const userResponse: any = await this.usuarioService.getUsuarioById(tokenValue.nameid);
      userStorage.user = userResponse['usuario'];
      localStorage.setItem('userStorage', JSON.stringify(userStorage));
      // localStorage.setItem('token', response.Token);
      this.router.navigate(['/in/home']);
    } else {
      if (response.error.startsWith('Usuário')) {
        this.invalidUsername = true;
        this.messageService.add({
          key: 'invalidLogin',
          severity: 'error',
          summary: 'Error',
          detail: response.error,
        });
      } else {
        this.invalidPassword = true;
        this.messageService.add({
          key: 'invalidLogin',
          severity: 'error',
          summary: 'Error',
          detail: response.error,
        });
      }
    }

    // if (this.username === this._username && this.password === this._password) {
    //   let token:string = Guidv4();
    //   localStorage.setItem('token', token);
    //   this.router.navigate(['/in/home']);
    // }
    // else
    // {
    //   this.invalidUsername = this.invalidPassword = true;
    //   this.messageService.add({ key: 'invalidLogin', severity: 'error', summary: 'Error', detail: 'Username or Password are invalid.' });
    // }
  }
}
