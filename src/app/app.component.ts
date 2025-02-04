import { Component } from '@angular/core';
import { AbilityScoresArrayComponent } from './components/ability-scores-array/ability-scores-array.component';

@Component({
  selector: 'app-root',
  imports: [AbilityScoresArrayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'NGXS_testing';
}
