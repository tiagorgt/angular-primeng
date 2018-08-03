import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'layout-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  @Input()
  title: string;
  
  constructor() { }

  ngOnInit() {
  }

}
