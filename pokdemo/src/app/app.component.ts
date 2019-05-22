import { Component } from '@angular/core';
import { MyComponentComponent } from './my-component/my-component.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[MyComponentComponent]
})
export class AppComponent {
  title = 'Pokedex';
}
