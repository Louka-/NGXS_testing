import { TestBed } from '@angular/core/testing';
import {  provideStore,  Store } from '@ngxs/store';
import { OperationsState, OperationsStateModel } from './operations.state';

describe('Operations state', () => {
    let store: Store;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideStore([OperationsState])]

      });

      store = TestBed.inject(Store);
    });

    it('should create an empty state', () => {
        const actual = store.selectSnapshot(OperationsState.getState);
        const expected: OperationsStateModel = {
            items: []
        };
        expect(actual).toEqual(expected);
    });

});
