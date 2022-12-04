import { Component, Input } from '@angular/core';
import { Sneaker } from '../types/sneaker';

@Component({
  selector: 'app-sneaker-list',
  templateUrl: './sneaker-list.component.html',
})
export class SneakerListComponent {
  @Input() sneakers: Sneaker[] = [];
  @Input() title: string = '';
}
