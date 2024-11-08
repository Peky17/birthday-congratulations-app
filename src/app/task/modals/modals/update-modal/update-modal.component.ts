import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  NgbModal,
  NgbModalConfig,
  NgbModalOptions,
} from '@ng-bootstrap/ng-bootstrap';
// import { TareasService } from 'src/app/services/tareas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.css'],
  // add NgbModalConfig and NgbModal to the component providers
  providers: [NgbModalConfig, NgbModal],
})
export class UpdateModalComponent implements OnInit {
  // Recibimos el dato del componente principal
  @Input() tarea: any;
  updateFormulario!: FormGroup; // Use definite assignment assertion

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    // private tareasService: TareasService,
    private formBuilder: FormBuilder
  ) {
    config.backdrop = 'static';
    config.keyboard = true;
  }

  ngOnInit() {
    // Initialize the FormGroup here, after tarea has been initialized.
    this.updateFormulario = this.formBuilder.group({
      nombre: [
        this.tarea.nombre,
        [Validators.required, Validators.minLength(6)],
      ],
    });
  }

  open(content: any) {
    const modalOptions: NgbModalOptions = {
      backdrop: 'static', // Mantener el fondo visible
      keyboard: true, // Permitir cerrar el modal con la tecla Esc
    };

    this.modalService.open(content, modalOptions);
  }

  updateTarea() {
    // Instanciar el formulario
    const formData = this.updateFormulario.value;
    // Obtener el id de la tarea
    const idTarea: string = this.tarea._id;
    // Realizar la petición
    // this.tareasService.actualizarTarea(formData, idTarea).subscribe((res) => {
    //   if (res === 'true') {
    //     // Cerrar modal
    //     this.modalService.dismissAll();
    //     // Alertar
    //     Swal.fire({
    //       title: 'OPERACIÓN EXITOSA',
    //       text: 'Tarea actualizada con éxito',
    //       icon: 'success',
    //     }).then(() => {
    //       // Recargar la página
    //       location.reload();
    //     });
    //   } else {
    //     Swal.fire({
    //       title: 'OPERACIÓN DENEGADA',
    //       text: res,
    //       icon: 'error',
    //     });
    //     // Cerrar modal
    //     this.modalService.dismissAll();
    //   }
    // });
  }
}
