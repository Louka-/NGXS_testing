import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Store } from '@ngxs/store';
import { DecrementAbilityOperation, IncrementAbilityOperation } from '../../states/operations/operations.actions';

@Component({
  selector: 'ability-scores-selector',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './ability-scores-selector.component.html',
  styleUrl: './ability-scores-selector.component.scss'
})
export class AbilityScoresSelectorComponent  {
  private store = inject(Store);
  @Input() racialBonus = 0;
  @Input() abilityScore = 0;
  @Input() abilityName = '';
  @Input() abilityIndex = '';
  @Input() disableAddButton = false;
  @Input() abilityMod: string = '';
  minValue: number = 8;
  maxValue: number = 20;

  increment(abilityIndex: string) {
    if (this.abilityScore < this.maxValue || this.disableAddButton) {
      this.store.dispatch(new IncrementAbilityOperation(abilityIndex));
      this.abilityScore++;
    }
  }

  decrement(abilityIndex: string) {
    if (this.abilityScore > this.minValue) {
      this.store.dispatch(new DecrementAbilityOperation(abilityIndex));
      this.abilityScore--;
    }
  }
}
