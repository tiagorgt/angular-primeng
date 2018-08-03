import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { TopbarComponent } from './topbar/topbar.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { ScrollPanelModule, ButtonModule } from 'primeng/primeng';
import { MainComponent } from './main/main.component';
import { AppRoutes } from '../app.routes';

@NgModule({
  imports: [
    CommonModule,
    ScrollPanelModule,
    ButtonModule,
    AppRoutes
  ],
  declarations: [
    MenuComponent,
    TopbarComponent,
    FooterComponent,
    PageHeaderComponent,
    MainComponent
  ],
  exports: [
    MenuComponent,
    TopbarComponent,
    FooterComponent,
    PageHeaderComponent,
    MainComponent
  ]
})
export class LayoutModule { }
