import { Routes } from "@angular/router";
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
            }
        ]
    }
]