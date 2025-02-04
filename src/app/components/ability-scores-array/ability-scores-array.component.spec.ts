import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbilityScoresArrayComponent } from './ability-scores-array.component';
import { provideStore } from '@ngxs/store';
import { Store } from '@ngxs/store';
import { MatButtonModule } from '@angular/material/button';
import { AbilityScoresSelectorComponent } from '../ability-scores-selector/ability-scores-selector.component';
import { ResetAbilityPointsOperation } from '../../states/operations/operations.actions';
import { By } from '@angular/platform-browser';
import { OperationsState } from '../../states/operations/operations.state';

describe('AbilityScoresArrayComponent', () => {
  let component: AbilityScoresArrayComponent;
  let fixture: ComponentFixture<AbilityScoresArrayComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatButtonModule],
      providers: [
        provideStore([OperationsState])
      ]
    }).compileComponents();

    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(AbilityScoresArrayComponent);
    component = fixture.componentInstance;

    spyOn(store, 'dispatch');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display available points', () => {
    fixture.detectChanges();
    const availablePointsElement = fixture.debugElement.query(By.css('.header-info')).nativeElement;
    expect(availablePointsElement.textContent).toContain('27');
  });

  it('should call resetAvailablePoints method and dispatch action', () => {
    fixture.detectChanges();
    component.resetAvailablePoints();
    expect(store.dispatch).toHaveBeenCalledWith(new ResetAbilityPointsOperation());
  });

  it('should display ability scores correctly', () => {
    fixture.detectChanges();

    const abilitySelectors = fixture.debugElement.queryAll(By.directive(AbilityScoresSelectorComponent));
    expect(abilitySelectors.length).toBe(6);

    const strSelector = abilitySelectors[0].componentInstance as AbilityScoresSelectorComponent;
    expect(strSelector.abilityName).toBe('STR');
    expect(strSelector.abilityIndex).toBe('str');
    expect(strSelector.abilityScore).toBe(8);
    expect(strSelector.racialBonus).toBe(0);
    expect(strSelector.abilityMod).toBe('(-1)');
  });

  it('should calculate ability modifier correctly', () => {
    expect(component.getBonusCaracteristique(14)).toBe('(+2)');
    expect(component.getBonusCaracteristique(8)).toBe('(-1)');
  });
});
