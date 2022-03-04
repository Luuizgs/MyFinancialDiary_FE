import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-botao-menu',
  templateUrl: './botao-menu.component.html',
  styleUrls: ['./botao-menu.component.scss']
})
export class BotaoMenuComponent implements OnInit {

  @Input()
  buttonLabel: string;
  
  @Input()
  buttonIcon: string;

  @Input()
  isButtonSelecionado: boolean = false;

  @Output()
  onClickBotaoMenu = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.onClickBotaoMenu.emit();
  }

}
