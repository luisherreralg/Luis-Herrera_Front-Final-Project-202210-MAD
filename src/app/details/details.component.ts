import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SneakersService } from '../services/sneakers.service';
import { Sneaker } from '../types/sneaker';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  id: string = '';
  sneaker = {} as Sneaker;

  private sub: any;

  constructor(private route: ActivatedRoute, public service: SneakersService) {}

  // Para sacar el queryparam
  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];
      console.log(this.id);
    });

    this.service.getSneaker(this.id).subscribe((sneaker) => {
      this.sneaker = sneaker.sneaker;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
