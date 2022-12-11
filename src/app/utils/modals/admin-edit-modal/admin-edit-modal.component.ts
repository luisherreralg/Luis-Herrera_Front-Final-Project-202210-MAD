import { Component } from '@angular/core';
import { ModalHandlerService } from 'src/app/services/modal-handler.service';

@Component({
  selector: 'app-admin-edit-modal',
  templateUrl: './admin-edit-modal.component.html',
})
export class AdminEditModalComponent {
  constructor(public modalService: ModalHandlerService) {}

  handleAdminEditModal() {
    this.modalService.adminEditModal(false);
  }
}
