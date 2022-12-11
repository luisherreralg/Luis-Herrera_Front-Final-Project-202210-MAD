import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { of } from 'rxjs';
import { mockSneakersInitialState } from './utils/mocks/mocks';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        provideMockStore(mockSneakersInitialState),
        HttpClient,
        HttpHandler,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  describe('When loading the app component', () => {
    it('should bring sneaker data from the server with the sneakers services', () => {
      spyOn(app.store, 'dispatch');
      spyOn(app.sneakerService, 'getSneakers').and.returnValue(
        of({ sneakers: [] })
      );

      fixture.detectChanges();
      expect(app.store.dispatch).toHaveBeenCalled();
    });

    it('should call to the pathService', () => {
      const spyPathService = spyOn(app.pathService, 'getPath').and.returnValue(
        of('path')
      );

      new AppComponent(
        app.store,
        app.sneakerService,
        app.modalService,
        app.pathService
      );

      expect(spyPathService).toHaveBeenCalled();
    });
  });

  describe('Given the onWindowScroll method, when its invoked', () => {
    it('should change the isScrolled variable to true if the document scroll top is more than 260px', () => {
      spyOnProperty(document.documentElement, 'scrollTop').and.returnValue(300);
      app.onWindowScroll();
      expect(app.isScrolled).toBeTrue();
    });

    it('should change the isScrolled variable to false if the document scroll top is less than 260px', () => {
      spyOnProperty(document.body, 'scrollTop').and.returnValue(100);
      app.onWindowScroll();
      expect(app.isScrolled).toBeFalse();
    });

    it('same case but with a different values tu cover the "0" case', () => {
      spyOnProperty(document.body, 'scrollTop').and.returnValue(0);
      spyOnProperty(document.documentElement, 'scrollTop').and.returnValue(0);

      app.onWindowScroll();
      expect(app.isScrolled).toBeFalse();
    });
  });
});
