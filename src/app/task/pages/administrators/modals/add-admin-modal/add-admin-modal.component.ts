import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  NgbActiveModal,
  NgbModal,
  NgbModalConfig,
  NgbModalOptions,
} from '@ng-bootstrap/ng-bootstrap';
import { AdministratorService } from 'src/app/services/administrator.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-admin-modal',
  templateUrl: './add-admin-modal.component.html',
  styleUrls: ['./add-admin-modal.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class AddAdminModalComponent implements OnInit {
  addFormulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private administratorService: AdministratorService
  ) {
    this.addFormulario = this.fb.group({
      name: ['', Validators.required, Validators.minLength(4)],
      email: ['', [Validators.required, Validators.email]],
      cellphone: [
        '',
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ],
      password: ['', Validators.required],
    });
  }

  open(content: any) {
    const modalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: true,
    };

    this.modalService.open(content, modalOptions);
  }

  ngOnInit(): void {}

  addAdmin() {
    const formData = this.addFormulario.value;
    if (this.addFormulario.invalid) {
      Swal.fire({
        toast: true,
        title: 'OPERACIÓN DENEGADA',
        text: 'Por favor, complete todos los campos',
        icon: 'error',
        position: 'top-right',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else {
      this.administratorService.createAdministrator(formData).subscribe(
        (res) => {
          this.modalService.dismissAll();
          Swal.fire({
            title: 'OPERACIÓN EXITOSA',
            text: 'Profesor registrado con éxito',
            icon: 'success',
          }).then(() => {
            location.reload();
          });
        },
        (err) => {
          Swal.fire({
            title: 'OPERACIÓN DENEGADA',
            text: err.error.message,
            icon: 'error',
          });
          this.modalService.dismissAll();
        }
      );
    }
  }
}
