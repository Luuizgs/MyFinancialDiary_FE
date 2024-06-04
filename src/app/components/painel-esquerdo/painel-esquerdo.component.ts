import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IUserStorage } from 'src/app/Interfaces/Entities/IUserStorage';
import { IUsuario } from 'src/app/Interfaces/Entities/IUsuario';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { toCamelCase } from 'src/app/utils/FuncHelpers';

@Component({
  selector: 'app-painel-esquerdo',
  templateUrl: './painel-esquerdo.component.html',
  styleUrls: ['./painel-esquerdo.component.scss'],
})

export class PainelEsquerdoComponent implements OnInit {
  public usuario: IUsuario;
  public menuSelecionado: string;

  @Output()
  event = new EventEmitter<string>();

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.menuSelecionado = 'home';
    this.usuario = this.getUsuario();
    this.usuario.username = toCamelCase(this.usuario.username);
    this.menuSelecionado = '';
  }

  buttonClick(button: string) {
    this.menuSelecionado = button;
    this.event.emit(button);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getUsuario() {
    const userStorage: IUserStorage = JSON.parse(localStorage.getItem('userStorage'));
    return userStorage.user;
  }
}
