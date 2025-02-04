import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbilityScoresSelectorComponent } from '../ability-scores-selector/ability-scores-selector.component';
import { Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { AbilityScore } from '../../models/ability-bonus.model';
import { OperationsState } from '../../states/operations/operations.state';
import { ResetAbilityPointsOperation } from '../../states/operations/operations.actions';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'ability-scores-array',
  standalone: true,
  imports: [CommonModule, AbilityScoresSelectorComponent, MatButtonModule],
  templateUrl: './ability-scores-array.component.html',
  styleUrl: './ability-scores-array.component.scss'
})
export class AbilityScoresArrayComponent implements OnInit  {
  store = inject(Store);
  strAbilityBonus$!: Observable<{ racialBonus: number; ability_score: AbilityScore; abilityMod: string; bonus: number; }>;
  conAbilityBonus$!: Observable<{ racialBonus: number; ability_score: AbilityScore; abilityMod: string; bonus: number; }>;
  dexAbilityBonus$!: Observable<{ racialBonus: number; ability_score: AbilityScore; abilityMod: string; bonus: number; }>;
  intAbilityBonus$!: Observable<{ racialBonus: number; ability_score: AbilityScore; abilityMod: string; bonus: number; }>;
  wisAbilityBonus$!: Observable<{ racialBonus: number; ability_score: AbilityScore; abilityMod: string; bonus: number; }>;
  chaAbilityBonus$!: Observable<{ racialBonus: number; ability_score: AbilityScore; abilityMod: string; bonus: number; }>;

  availablePoints$: Observable<number> = this.store.select(OperationsState.selectAvailablePoints);

  ngOnInit(): void {
    this.strAbilityBonus$ = this.store.select(OperationsState.selectStrAbilityBonus).pipe(
      map((strAbilityBonus) => {
          return {
            ...strAbilityBonus,
            racialBonus: 0,
            abilityMod: this.getBonusCaracteristique(strAbilityBonus.bonus),
          };
      }),
    );

    this.conAbilityBonus$ = this.store.select(OperationsState.selectConAbilityBonus).pipe(
      map((conAbilityBonus) => {
          return {
            ...conAbilityBonus,
            racialBonus: 0,
            abilityMod: this.getBonusCaracteristique(conAbilityBonus.bonus),
          };
      }),
    );

    this.dexAbilityBonus$ = this.store.select(OperationsState.selectDexAbilityBonus).pipe(
      map((dexAbilityBonus) => {
          return {
            ...dexAbilityBonus,
            racialBonus: 0,
            abilityMod: this.getBonusCaracteristique(dexAbilityBonus.bonus),
          };
      }),
    );

    this.intAbilityBonus$ = this.store.select(OperationsState.selectIntAbilityBonus).pipe(
      map((intAbilityBonus) => {
          return {
            ...intAbilityBonus,
            racialBonus: 0,
            abilityMod: this.getBonusCaracteristique(intAbilityBonus.bonus),
          };
      }),
    );

    this.wisAbilityBonus$ = this.store.select(OperationsState.selectWisAbilityBonus).pipe(
      map((wisAbilityBonus) => {
          return {
            ...wisAbilityBonus,
            racialBonus: 0,
            abilityMod: this.getBonusCaracteristique(wisAbilityBonus.bonus),
          };
      }),
    );

    this.chaAbilityBonus$ = this.store.select(OperationsState.selectChaAbilityBonus).pipe(
      map((chaAbilityBonus) => {
          return {
            ...chaAbilityBonus,
            racialBonus: 0,
            abilityMod: this.getBonusCaracteristique(chaAbilityBonus.bonus),
          };
      }),
    );
  }

  resetAvailablePoints(): void {
    this.store.dispatch(new ResetAbilityPointsOperation);
  }

  getBonusCaracteristique(score: number): string {
    const bonus = Math.floor((score - 10) / 2);
    return (bonus >= 0 ? `(+${bonus})` : `(${bonus})`);
  }
}
