import { Routes } from "@angular/router";
import { DiarioMensalComponent } from "../diario-mensal/diario-mensal.component";
import { HomeComponent } from "../home/home.component";
import { PanelComponent } from "./panel.component";

export const PanelRotas: Routes = [
    {
        path: '',
        component: PanelComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'diariomensal',
                component: DiarioMensalComponent
            }
        ]
    }
]