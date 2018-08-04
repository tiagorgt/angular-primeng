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
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from '../../node_modules/primeng/primeng';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import {KeyFilterModule} from 'primeng/keyfilter';
import { CurrencyMaskModule } from "ng2-currency-mask";
import {CheckboxModule} from 'primeng/checkbox';
import {CalendarModule} from 'primeng/calendar';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutes,
        ScrollPanelModule,
        ButtonModule,
        PanelModule,
        LayoutModule,
        InputTextModule,
        ReactiveFormsModule,
        MessageModule,
        DropdownModule,
        InputMaskModule,
        KeyFilterModule,
        CurrencyMaskModule,
        CheckboxModule,
        CalendarModule
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
