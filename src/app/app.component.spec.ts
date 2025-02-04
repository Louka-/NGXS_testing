import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideStore } from '@ngxs/store';
import { OperationsState } from './states/operations/operations.state';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideStore([OperationsState])
    ]}).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'NGXS_testing' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('NGXS_testing');
  });
});
