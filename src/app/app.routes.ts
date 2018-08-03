import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemComponent } from './item/item.component';

export const routes: Routes = [
    { path: '', redirectTo: '/item-list', pathMatch: 'full' },
    { path: 'item', component: ItemComponent}, 
    { path: 'item-list', component: ItemListComponent }, 
    { path: '**', redirectTo: '/item-list' }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
