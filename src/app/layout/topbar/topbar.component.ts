import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'layout-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {

  constructor(public app: AppComponent) { }

}
