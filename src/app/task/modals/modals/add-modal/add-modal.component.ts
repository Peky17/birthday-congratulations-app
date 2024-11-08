import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  NgbModal,
  NgbModalConfig,
  NgbModalOptions,
} from '@ng-bootstrap/ng-bootstrap';
import { TareasService } from 'src/app/services/tareas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class AddModalComponent {
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private tareasService: TareasService,
    private formBuilder: FormBuilder
  ) {
    config.backdrop = 'static';
    config.keyboard = true;
  }

  open(content: any) {
    const modalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: true,
    };

    this.modalService.open(content, modalOptions);
  }

  addFormulario: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(6)]],
  });

  addTarea() {
    // Instanciar el formulario
    const formData = this.addFormulario.value;
    // Realizar la petición
    this.tareasService.addTarea(formData).subscribe((res) => {
      if (res === 'true') {
        // Cerrar modal
        this.modalService.dismissAll();
        // Alertar
        Swal.fire({
          title: 'OPERACIÓN EXITOSA',
          text: 'Tarea registrada con éxito',
          icon: 'success',
        }).then(() => {
          // Recargar la página
          location.reload();
        });
      } else {
        Swal.fire({
          title: 'OPERACIÓN DENEGADA',
          text: res,
          icon: 'error',
        });
        // Cerrar modal
        this.modalService.dismissAll();
      }
    });
  }
}
