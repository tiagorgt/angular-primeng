import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ScrollPanel } from 'primeng/primeng';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'layout-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {

  menu: any[];

  @ViewChild('scrollPanel') layoutMenuScrollerViewChild: ScrollPanel;

  constructor(public app: AppComponent) { }

  ngAfterViewInit() {
    setTimeout(() => { this.layoutMenuScrollerViewChild.moveBar(); }, 100);
  }

  ngOnInit() {
    this.menu = [
      { label: 'Item List', routerLink: ['/item-list'] },
    ];
  }
}