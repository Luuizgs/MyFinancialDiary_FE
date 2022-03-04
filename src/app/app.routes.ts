import { Routes } from "@angular/router";
import { AuthenticateGuard } from "./guards/authenticate.guard";

export const AppRotas: Routes = [
    {
        path: '',
        redirectTo: 'in',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(y => y.LoginModule)
    },
    {
        path: 'in',
        loadChildren: () => import('./pages/panel/panel.module').then(y => y.PanelModule),
        canLoad: [AuthenticateGuard]
    }
]