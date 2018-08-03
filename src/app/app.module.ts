import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ButtonModule } from 'primeng/button';
import { ItemComponent } from './item/item.component';
import { ItemListComponent } from './item-list/item-list.component';
import { PanelModule } from 'primeng/panel';
import { LayoutModule } from './layout/layout.module';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutes,
        ScrollPanelModule,
        ButtonModule,
        PanelModule,
        LayoutModule
    ],
    declarations: [
        AppComponent,
        ItemComponent,
        ItemListComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
