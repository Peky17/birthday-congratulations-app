import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  NgbModal,
  NgbModalConfig,
  NgbModalOptions,
} from '@ng-bootstrap/ng-bootstrap';
import { TeacherService } from 'src/app/services/teacher.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class AddModalComponent {
  addFormulario: FormGroup;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private teacherService: TeacherService,
    private formBuilder: FormBuilder
  ) {
    config.backdrop = 'static';
    config.keyboard = true;

    this.addFormulario = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
    });
  }

  open(content: any) {
    const modalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: true,
    };

    this.modalService.open(content, modalOptions);
  }

  addTeacher() {
    const formData = this.addFormulario.value;
    this.teacherService.createTeacher(formData).subscribe(
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
