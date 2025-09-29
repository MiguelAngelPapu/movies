import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./modules/home/presentation/pages/home-free/home-free.component').then(homeFree => homeFree.HomeFreeComponent)
    }
];
