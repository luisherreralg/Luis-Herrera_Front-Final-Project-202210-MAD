import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  isLogged = false;
  constructor(public storageService: LocalStorageService) {}

  ngOnInit(): void {
    this.isLogged = this.storageService.getToken() ? true : false;
  }
}
