import { TestBed } from '@angular/core/testing';
import { StateContext } from '@ngxs/store';
import { OperationsState, OperationsStateModel } from './operations.state';
import { IncrementAbilityOperation, DecrementAbilityOperation, ResetAbilityPointsOperation } from './operations.actions';

describe('OperationsState', () => {
  let state: OperationsState;
  let stateContext: Partial<StateContext<OperationsStateModel>>;

  let initialState: OperationsStateModel = {
    strAbilityBonus: { ability_score: { index: 'str', name: 'STR', url: '/api/ability-scores/str' }, bonus: 8 },
    conAbilityBonus: { ability_score: { index: 'con', name: 'CON', url: '/api/ability-scores/con' }, bonus: 8 },
    dexAbilityBonus: { ability_score: { index: 'dex', name: 'DEX', url: '/api/ability-scores/dex' }, bonus: 8 },
    intAbilityBonus: { ability_score: { index: 'int', name: 'INT', url: '/api/ability-scores/int' }, bonus: 8 },
    wisAbilityBonus: { ability_score: { index: 'wis', name: 'WIS', url: '/api/ability-scores/wis' }, bonus: 8 },
    chaAbilityBonus: { ability_score: { index: 'cha', name: 'CHA', url: '/api/ability-scores/cha' }, bonus: 8 },
    availablePoints: 27,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    state = new OperationsState();
    stateContext = {
      getState: jasmine.createSpy('getState').and.returnValue(initialState),
      setState: jasmine.createSpy('setState')
    };
  });

  it('should create', () => {
    expect(state).toBeTruthy();
  });

  describe('Selectors', () => {
    it('should return the state', () => {
      expect(OperationsState.getState(initialState)).toEqual(initialState);
    });

    it('should return strAbilityBonus', () => {
      expect(OperationsState.selectStrAbilityBonus(initialState)).toEqual(initialState.strAbilityBonus);
    });

    it('should return conAbilityBonus', () => {
      expect(OperationsState.selectConAbilityBonus(initialState)).toEqual(initialState.conAbilityBonus);
    });

    it('should return dexAbilityBonus', () => {
      expect(OperationsState.selectDexAbilityBonus(initialState)).toEqual(initialState.dexAbilityBonus);
    });

    it('should return intAbilityBonus', () => {
      expect(OperationsState.selectIntAbilityBonus(initialState)).toEqual(initialState.intAbilityBonus);
    });

    it('should return wisAbilityBonus', () => {
      expect(OperationsState.selectWisAbilityBonus(initialState)).toEqual(initialState.wisAbilityBonus);
    });

    it('should return chaAbilityBonus', () => {
      expect(OperationsState.selectChaAbilityBonus(initialState)).toEqual(initialState.chaAbilityBonus);
    });

    it('should return availablePoints', () => {
      expect(OperationsState.selectAvailablePoints(initialState)).toEqual(initialState.availablePoints);
    });
  });

  describe('Actions', () => {
    beforeEach(() => {
      initialState = {
        strAbilityBonus: { ability_score: { index: 'str', name: 'STR', url: '/api/ability-scores/str' }, bonus: 8 },
        conAbilityBonus: { ability_score: { index: 'con', name: 'CON', url: '/api/ability-scores/con' }, bonus: 8 },
        dexAbilityBonus: { ability_score: { index: 'dex', name: 'DEX', url: '/api/ability-scores/dex' }, bonus: 8 },
        intAbilityBonus: { ability_score: { index: 'int', name: 'INT', url: '/api/ability-scores/int' }, bonus: 8 },
        wisAbilityBonus: { ability_score: { index: 'wis', name: 'WIS', url: '/api/ability-scores/wis' }, bonus: 8 },
        chaAbilityBonus: { ability_score: { index: 'cha', name: 'CHA', url: '/api/ability-scores/cha' }, bonus: 8 },
        availablePoints: 27,
      };
    });
    it('should increment strAbilityBonus and decrement availablePoints', () => {
      state.incrementOperation(stateContext as StateContext<OperationsStateModel>, new IncrementAbilityOperation('str'));
      expect(stateContext.setState).toHaveBeenCalledWith({
        ...initialState,
        availablePoints: 26,
        strAbilityBonus: { ...initialState.strAbilityBonus, bonus: 9 }
      });
    });

    it('should decrement strAbilityBonus and increment availablePoints', () => {
      state.decrementOperation(stateContext as StateContext<OperationsStateModel>, new DecrementAbilityOperation('str'));
      expect(stateContext.setState).toHaveBeenCalledWith({
        ...initialState,
        availablePoints: 28,
        strAbilityBonus: { ...initialState.strAbilityBonus, bonus: 7 }
      });
    });

    it('should increment conAbilityBonus and decrement availablePoints', () => {
      state.incrementOperation(stateContext as StateContext<OperationsStateModel>, new IncrementAbilityOperation('con'));
      expect(stateContext.setState).toHaveBeenCalledWith({
        ...initialState,
        availablePoints: 26,
        conAbilityBonus: { ...initialState.conAbilityBonus, bonus: 9 }
      });
    });

    it('should decrement conAbilityBonus and increment availablePoints', () => {
      state.decrementOperation(stateContext as StateContext<OperationsStateModel>, new DecrementAbilityOperation('con'));
      expect(stateContext.setState).toHaveBeenCalledWith({
        ...initialState,
        availablePoints: 28,
        conAbilityBonus: { ...initialState.conAbilityBonus, bonus: 7 }
      });
    });

    it('should increment dexAbilityBonus and decrement availablePoints', () => {
      state.incrementOperation(stateContext as StateContext<OperationsStateModel>, new IncrementAbilityOperation('dex'));
      expect(stateContext.setState).toHaveBeenCalledWith({
        ...initialState,
        availablePoints: 26,
        dexAbilityBonus: { ...initialState.dexAbilityBonus, bonus: 9 }
      });
    });

    it('should decrement dexAbilityBonus and increment availablePoints', () => {
      state.decrementOperation(stateContext as StateContext<OperationsStateModel>, new DecrementAbilityOperation('dex'));
      expect(stateContext.setState).toHaveBeenCalledWith({
        ...initialState,
        availablePoints: 28,
        dexAbilityBonus: { ...initialState.dexAbilityBonus, bonus: 7 }
      });
    });

    it('should increment intAbilityBonus and decrement availablePoints', () => {
      state.incrementOperation(stateContext as StateContext<OperationsStateModel>, new IncrementAbilityOperation('int'));
      expect(stateContext.setState).toHaveBeenCalledWith({
        ...initialState,
        availablePoints: 26,
        intAbilityBonus: { ...initialState.intAbilityBonus, bonus: 9 }
      });
    });

    it('should decrement intAbilityBonus and increment availablePoints', () => {
      state.decrementOperation(stateContext as StateContext<OperationsStateModel>, new DecrementAbilityOperation('int'));
      expect(stateContext.setState).toHaveBeenCalledWith({
        ...initialState,
        availablePoints: 28,
        intAbilityBonus: { ...initialState.intAbilityBonus, bonus: 7 }
      });
    });

    it('should increment wisAbilityBonus and decrement availablePoints', () => {
      state.incrementOperation(stateContext as StateContext<OperationsStateModel>, new IncrementAbilityOperation('wis'));
      expect(stateContext.setState).toHaveBeenCalledWith({
        ...initialState,
        availablePoints: 26,
        wisAbilityBonus: { ...initialState.wisAbilityBonus, bonus: 9 }
      });
    });

    it('should decrement wisAbilityBonus and increment availablePoints', () => {
      state.decrementOperation(stateContext as StateContext<OperationsStateModel>, new DecrementAbilityOperation('wis'));
      expect(stateContext.setState).toHaveBeenCalledWith({
        ...initialState,
        availablePoints: 28,
        wisAbilityBonus: { ...initialState.wisAbilityBonus, bonus: 7 }
      });
    });

    it('should increment chaAbilityBonus and decrement availablePoints', () => {
      state.incrementOperation(stateContext as StateContext<OperationsStateModel>, new IncrementAbilityOperation('cha'));
      expect(stateContext.setState).toHaveBeenCalledWith({
        ...initialState,
        availablePoints: 26,
        chaAbilityBonus: { ...initialState.chaAbilityBonus, bonus: 9 }
      });
    });

    it('should decrement chaAbilityBonus and increment availablePoints', () => {
      state.decrementOperation(stateContext as StateContext<OperationsStateModel>, new DecrementAbilityOperation('cha'));
      expect(stateContext.setState).toHaveBeenCalledWith({
        ...initialState,
        availablePoints: 28,
        chaAbilityBonus: { ...initialState.chaAbilityBonus, bonus: 7 }
      });
    });

    it('should return the default state when no string provided on increment', () => {
      state.incrementOperation(stateContext as StateContext<OperationsStateModel>, new IncrementAbilityOperation(''));
      expect(stateContext.setState).toHaveBeenCalledWith({
        ...initialState,
      });
    });

    it('should return the default state when no string provided on decrement', () => {
      state.decrementOperation(stateContext as StateContext<OperationsStateModel>, new DecrementAbilityOperation(''));
      expect(stateContext.setState).toHaveBeenCalledWith({
        ...initialState,
      });
    });

    it('should reset state to initialState', () => {
      state.resetPointsOperation(stateContext as StateContext<OperationsStateModel>);
      expect(stateContext.setState).toHaveBeenCalledWith(initialState);
    });
  });
});
