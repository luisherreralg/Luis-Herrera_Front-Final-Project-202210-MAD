import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ROOT_REDUCERS } from './state/app.sate';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { of } from 'rxjs';
import { SneakerListComponent } from './sneaker-list/sneaker-list.component';

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
