import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SneakersService } from '../services/sneakers.service';
import { Sneaker } from '../types/sneaker';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  id: string = '';
  sneaker = {} as Sneaker;

  param: any;

  constructor(public route: ActivatedRoute, public service: SneakersService) {}

  // Para sacar el queryparam
  ngOnInit() {
    this.param = this.route.params.subscribe((params) => {
      this.id = params['id'];
      console.log(this.id);
    });

    this.service.getSneaker(this.id).subscribe((data) => {
      this.sneaker = data.sneaker;
    });
  }
}
