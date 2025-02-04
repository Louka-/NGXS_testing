import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { DecrementAbilityOperation, IncrementAbilityOperation, ResetAbilityPointsOperation } from './operations.actions';
import { AbilityBonus } from '../../models/ability-bonus.model';

export interface OperationsStateModel {
  strAbilityBonus: AbilityBonus;
  conAbilityBonus: AbilityBonus;
  dexAbilityBonus: AbilityBonus;
  intAbilityBonus: AbilityBonus;
  wisAbilityBonus: AbilityBonus;
  chaAbilityBonus: AbilityBonus;
  availablePoints: number;
}

const initialState: OperationsStateModel = {
  strAbilityBonus:
  {
    ability_score: {
      index: 'str',
      name: 'STR',
      url: '/api/ability-scores/str',
    },
    bonus: 8
  },
  conAbilityBonus:
  {
    ability_score: {
      index: 'con',
      name: 'CON',
      url: '/api/ability-scores/con',
    },
    bonus: 8
  },
  dexAbilityBonus:
  {
    ability_score: {
      index: 'dex',
      name: 'DEX',
      url: '/api/ability-scores/dex',
    },
    bonus: 8
  },
  intAbilityBonus:
  {
    ability_score: {
      index: 'int',
      name: 'INT',
      url: '/api/ability-scores/int',
    },
    bonus: 8
  },
  wisAbilityBonus:
  {
    ability_score: {
      index: 'wis',
      name: 'WIS',
      url: '/api/ability-scores/wis',
    },
    bonus: 8
  },
  chaAbilityBonus:
  {
    ability_score: {
      index: 'cha',
      name: 'CHA',
      url: '/api/ability-scores/cha',
    },
    bonus: 8
  },
  availablePoints: 27,
};

@State<OperationsStateModel>({
  name: 'operations',
  defaults: initialState
})

@Injectable()
export class OperationsState {

  @Selector()
  static getState(state: OperationsStateModel) {
      return state;
  }

  @Selector()
  static selectStrAbilityBonus(state: OperationsStateModel) {
    return state.strAbilityBonus;
  }

  @Selector()
  static selectConAbilityBonus(state: OperationsStateModel) {
    return state.conAbilityBonus;
  }

  @Selector()
  static selectDexAbilityBonus(state: OperationsStateModel) {
    return state.dexAbilityBonus;
  }

  @Selector()
  static selectIntAbilityBonus(state: OperationsStateModel) {
    return state.intAbilityBonus;
  }

  @Selector()
  static selectWisAbilityBonus(state: OperationsStateModel) {
    return state.wisAbilityBonus;
  }

  @Selector()
  static selectChaAbilityBonus(state: OperationsStateModel) {
    return state.chaAbilityBonus;
  }

  @Selector()
  static selectAvailablePoints(state: OperationsStateModel) {
    return state.availablePoints;
  }

  @Action(IncrementAbilityOperation)
  incrementOperation({getState, setState}: StateContext<OperationsStateModel>, { abilityIndex } : IncrementAbilityOperation) {
    const state = getState();
    switch (abilityIndex) {
      case 'str':
        return setState({ ...state, availablePoints:--state.availablePoints, strAbilityBonus: { ...state.strAbilityBonus, bonus: state.strAbilityBonus.bonus + 1 } });
      case 'con':
        return setState({ ...state, availablePoints:--state.availablePoints, conAbilityBonus: { ...state.conAbilityBonus, bonus: state.conAbilityBonus.bonus + 1 } });
      case 'dex':
        return setState({ ...state, availablePoints:--state.availablePoints, dexAbilityBonus: { ...state.dexAbilityBonus, bonus: state.dexAbilityBonus.bonus + 1 } });
      case 'int':
        return setState({ ...state, availablePoints:--state.availablePoints, intAbilityBonus: { ...state.intAbilityBonus, bonus: state.intAbilityBonus.bonus + 1 } });
      case 'wis':
        return setState({ ...state, availablePoints:--state.availablePoints, wisAbilityBonus: { ...state.wisAbilityBonus, bonus: state.wisAbilityBonus.bonus + 1 } });
      case 'cha':
        return setState({ ...state, availablePoints:--state.availablePoints, chaAbilityBonus: { ...state.chaAbilityBonus, bonus: state.chaAbilityBonus.bonus + 1 } });
      default:
        return setState({...state});
    }
  }

  @Action(DecrementAbilityOperation)
  decrementOperation({getState, setState}: StateContext<OperationsStateModel>, { abilityIndex }: DecrementAbilityOperation) {
    const state = getState();
    switch (abilityIndex) {
      case 'str':
        return setState({ ...state, availablePoints:++state.availablePoints, strAbilityBonus: { ...state.strAbilityBonus, bonus: state.strAbilityBonus.bonus - 1 } });
      case 'con':
        return setState({ ...state, availablePoints:++state.availablePoints, conAbilityBonus: { ...state.conAbilityBonus, bonus: state.conAbilityBonus.bonus - 1 } });
      case 'dex':
        return setState({ ...state, availablePoints:++state.availablePoints, dexAbilityBonus: { ...state.dexAbilityBonus, bonus: state.dexAbilityBonus.bonus - 1 } });
      case 'int':
        return setState({ ...state, availablePoints:++state.availablePoints, intAbilityBonus: { ...state.intAbilityBonus, bonus: state.intAbilityBonus.bonus - 1 } });
      case 'wis':
        return setState({ ...state, availablePoints:++state.availablePoints, wisAbilityBonus: { ...state.wisAbilityBonus, bonus: state.wisAbilityBonus.bonus - 1 } });
      case 'cha':
        return setState({ ...state, availablePoints:++state.availablePoints, chaAbilityBonus: { ...state.chaAbilityBonus, bonus: state.chaAbilityBonus.bonus - 1 } });
      default:
        return setState({...state});
    }
  }

  @Action(ResetAbilityPointsOperation)
  resetPointsOperation({setState}: StateContext<OperationsStateModel>) {
    return setState(initialState);
  }
}
