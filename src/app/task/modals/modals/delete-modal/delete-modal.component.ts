import { Component, Input } from '@angular/core';
import {
  NgbModal,
  NgbModalConfig,
  NgbModalOptions,
} from '@ng-bootstrap/ng-bootstrap';
import { TareasService } from 'src/app/services/tareas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css'],
  // add NgbModalConfig and NgbModal to the component providers
  providers: [NgbModalConfig, NgbModal],
})
export class DeleteModalComponent {
  // Recibimos el dato del componente principal
  @Input() tarea: any;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private tareasService: TareasService
  ) {
    config.backdrop = 'static';
    config.keyboard = true;
  }

  open(content: any) {
    const modalOptions: NgbModalOptions = {
      backdrop: 'static', // Mantener el fondo visible
      keyboard: true, // Permitir cerrar el modal con la tecla Esc
    };

    this.modalService.open(content, modalOptions);
  }

  eliminarTarea() {
    // Realizar la petición
    this.tareasService.eliminarTarea(this.tarea._id).subscribe((res) => {
      if (res === 'true') {
        // Cerrar modal
        this.modalService.dismissAll();
        // Alertar
        Swal.fire({
          title: 'OPERACIÓN EXITOSA',
          text: 'Tarea eliminada con éxito',
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
