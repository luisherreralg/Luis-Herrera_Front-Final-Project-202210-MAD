import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Input() isScrolled = false;

  isLogged = false;
  isAdmin = false;

  constructor(public storageService: LocalStorageService) {}

  ngOnInit(): void {
    this.isLogged = this.storageService.getToken() ? true : false;
    this.isAdmin =
      this.storageService.checkTokenRole(
        this.storageService.getToken() as string
      )?.role === 'admin'
        ? true
        : false;
  }
}
