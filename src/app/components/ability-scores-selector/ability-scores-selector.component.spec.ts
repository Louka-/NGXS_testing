import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbilityScoresSelectorComponent } from './ability-scores-selector.component';
import { provideStore } from '@ngxs/store';
import { Store } from '@ngxs/store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DecrementAbilityOperation, IncrementAbilityOperation } from '../../states/operations/operations.actions';
import { By } from '@angular/platform-browser';
import { OperationsState } from '../../states/operations/operations.state';

describe('AbilityScoresSelectorComponent', () => {
  let component: AbilityScoresSelectorComponent;
  let fixture: ComponentFixture<AbilityScoresSelectorComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatButtonModule, MatIconModule],
      providers: [
        provideStore([OperationsState])
      ]
    }).compileComponents();

    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(AbilityScoresSelectorComponent);
    component = fixture.componentInstance;
    spyOn(store, 'dispatch');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display ability name and racial bonus', () => {
    component.abilityName = 'Strength';
    component.racialBonus = 2;
    fixture.detectChanges();

    const raceInfoElement = fixture.debugElement.query(By.css('.race-info')).nativeElement;
    expect(raceInfoElement.textContent).toContain('Strength');
    expect(raceInfoElement.textContent).toContain('+2');
  });

  it('should increment ability score and dispatch action', () => {
    component.abilityScore = 10;
    component.abilityIndex = 'str';
    fixture.detectChanges();

    const incrementButton = fixture.debugElement.queryAll(By.css('.button-wrapper button'))[1].nativeElement;
    incrementButton.click();

    expect(store.dispatch).toHaveBeenCalledWith(new IncrementAbilityOperation('str'));
    expect(component.abilityScore).toBe(11);
  });

  it('should decrement ability score and dispatch action', () => {
    component.abilityScore = 10;
    component.abilityIndex = 'str';
    fixture.detectChanges();

    const decrementButton = fixture.debugElement.queryAll(By.css('.button-wrapper button'))[0].nativeElement;
    decrementButton.click();

    expect(store.dispatch).toHaveBeenCalledWith(new DecrementAbilityOperation('str'));
    expect(component.abilityScore).toBe(9);
  });

  it('should disable increment button when abilityScore >= maxValue', () => {
    component.abilityScore = 20;
    component.maxValue = 20;
    fixture.detectChanges();

    const incrementButton = fixture.debugElement.queryAll(By.css('.button-wrapper button'))[1].nativeElement;
    expect(incrementButton.disabled).toBeTruthy();
  });

  it('should disable increment button when disableAddButton is true', () => {
    component.abilityScore = 20;
    component.maxValue = 20;
    component.disableAddButton = true;
    component.abilityIndex = 'str';
    fixture.detectChanges();

    component.increment('str');

    const incrementButton = fixture.debugElement.queryAll(By.css('.button-wrapper button'))[1].nativeElement;
    expect(incrementButton.disabled).toBeTruthy();
  });

  it('should disable decrement button when abilityScore <= minValue', () => {
    component.abilityScore = 8;
    component.minValue = 8;
    fixture.detectChanges();

    const decrementButton = fixture.debugElement.queryAll(By.css('.button-wrapper button'))[0].nativeElement;
    expect(decrementButton.disabled).toBeTruthy();
  });

  it('should display ability modifier', () => {
    component.abilityMod = '(+2)';
    fixture.detectChanges();

    const modValueElement = fixture.debugElement.query(By.css('.mod-value-wrapper span')).nativeElement;
    expect(modValueElement.textContent).toContain('(+2)');
  });
});
