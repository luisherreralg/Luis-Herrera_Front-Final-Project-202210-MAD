import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Sneaker } from '../types/sneaker';
import { DetailsComponent } from './details.component';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DetailsComponent],
      providers: [
        HttpClient,
        HttpHandler,
        { provide: ActivatedRoute, useValue: { params: of({ id: '1' }) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    const spy = spyOn(component.service, 'getSneaker').and.returnValue(
      of({ sneaker: {} as Sneaker })
    );
    const spyRoute = spyOn(component.route.params, 'subscribe');

    expect(component).toBeTruthy();
    expect(spy).toHaveBeenCalled();
    expect(spyRoute).toHaveBeenCalled();
  });
});
