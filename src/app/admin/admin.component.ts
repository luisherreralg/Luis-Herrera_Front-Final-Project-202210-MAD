import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppComponent } from '../app.component';
import { LocalStorageService } from '../services/local-storage.service';
import { SneakersService } from '../services/sneakers.service';
import { Sneaker } from '../types/sneaker';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  sneakers: Sneaker[] = [];

  constructor(
    public store: Store<AppComponent>,
    public localStorageService: LocalStorageService,
    public sneakersService: SneakersService
  ) {}

  ngOnInit(): void {
    this.sneakersService.getSneakers().subscribe((sneakers) => {
      this.sneakers = sneakers.sneakers;
    });
  }
}
