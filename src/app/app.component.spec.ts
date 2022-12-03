import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ROOT_REDUCERS } from './state/app.sate';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        provideMockStore({ initialState: { sneakers: ROOT_REDUCERS } }),
        HttpClient,
        HttpHandler,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Luis-Herrera_Front-Final-Project-202210-MAD'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Luis-Herrera_Front-Final-Project-202210-MAD');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain(
      'Work in Luis-Herrera_Front-Final-Project-202210-MAD is in progress'
    );
  });

  describe('When loading the app component', () => {
    it('should bring sneaker data from the server with the sneakers services', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      spyOn(app.store, 'dispatch');
      spyOn(app.sneakerService, 'getSneakers').and.returnValue(
        of({ sneakers: [] })
      );

      fixture.detectChanges();
      expect(app.store.dispatch).toHaveBeenCalled();
    });
  });
});
