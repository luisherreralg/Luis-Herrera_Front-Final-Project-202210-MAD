import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { of } from 'rxjs';
import { mockInitialState } from './utils/mocks/mocks';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [provideMockStore(mockInitialState), HttpClient, HttpHandler],
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

  describe('Given the handlerLoginModal function, when its invoked', () => {
    it('should change the value of the loginModal property', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      app.handlerLoginModal();
      expect(app.loginModal).toBeTrue();
    });
  });
  describe('Given the handlerRegisterModal function, when its invoked', () => {
    it('it should change the value of the registerModal property', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      app.handlerRegisterModal();
      expect(app.registerModal).toBeTrue();
    });
  });
});
