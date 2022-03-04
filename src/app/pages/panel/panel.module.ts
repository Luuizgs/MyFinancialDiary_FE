import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './panel.component';
import { RouterModule } from '@angular/router';
import { PanelRotas } from './panel.routes';
import { PainelEsquerdoComponent } from 'src/app/components/painel-esquerdo/painel-esquerdo.component';
import { BotaoMenuComponent } from 'src/app/components/botao-menu/botao-menu.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressSpinnerComponent } from 'src/app/components/progress-spinner/progress-spinner.component';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';
import { HomeComponent } from '../home/home.component';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [
    PanelComponent,
    PainelEsquerdoComponent,
    BotaoMenuComponent,
    ProgressSpinnerComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    RouterModule.forChild(PanelRotas),
    ProgressSpinnerModule,
    AvatarModule,
    TooltipModule,
    TableModule,
    ChartModule
  ],
})
export class PanelModule {}
