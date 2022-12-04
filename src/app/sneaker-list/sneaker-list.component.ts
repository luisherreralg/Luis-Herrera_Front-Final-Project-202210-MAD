import { Component, Input } from '@angular/core';
import { Sneaker } from '../types/sneaker';

@Component({
  selector: 'app-sneaker-list',
  templateUrl: './sneaker-list.component.html',
  styleUrls: ['./sneaker-list.component.css'],
})
export class SneakerListComponent {
  @Input() sneakers: Sneaker[] = [];
  @Input() title: string = '';
}
