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
import { GastoDescricaoPipe } from 'src/app/pipes/gastodescricao.pipe';
import { PagamentoDescricaoPipe } from 'src/app/pipes/pagamentodescricao.pipe';
import { DiarioMensalComponent } from '../diario-mensal/diario-mensal.component';
import { GastosModalComponent } from 'src/app/components/gastos-modal/gastos-modal.component';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { ToolbarModule } from 'primeng/toolbar';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';

@NgModule({
  declarations: [
    PanelComponent,
    PainelEsquerdoComponent,
    BotaoMenuComponent,
    ProgressSpinnerComponent,
    HomeComponent,
    DiarioMensalComponent,
    GastosModalComponent,

    GastoDescricaoPipe,
    PagamentoDescricaoPipe
  ],
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    RouterModule.forChild(PanelRotas),
    AvatarModule,
    TooltipModule,
    TableModule,
    ChartModule,
    DialogModule,
    ProgressSpinnerModule,
    PaginatorModule,
    ToolbarModule,
    CalendarModule,
    InputTextModule,
    DropdownModule,
    InputSwitchModule
  ],
})
export class PanelModule {}
