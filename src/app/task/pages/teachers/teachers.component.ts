import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TeacherService } from 'src/app/services/teacher.service';
import Swal from 'sweetalert2';
import { UpdateModalComponent } from './modals/update-modal/update-modal.component';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
})
export class TeachersComponent implements OnInit {
  teachers: any[] = [];

  constructor(
    private teacherService: TeacherService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getTeachers();
  }

  getTeachers(): void {
    this.teacherService.getTeachers().subscribe((data) => {
      this.teachers = data;
    });
  }

  openUpdateModal(teacher: any): void {
    const modalRef = this.modalService.open(UpdateModalComponent, {
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.teacher = teacher;

    modalRef.result.then(
      (result) => {
        if (result === 'updated') {
          this.getTeachers();
        }
      },
      (reason) => {
        console.log('Dismissed', reason);
      }
    );
  }

  confirmDelete(id: string, name: string): void {
    Swal.fire({
      title: '¿Estás seguro de eliminar del registro?',
      text: `Profesor: ${name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteTeacher(id);
      }
    });
  }

  deleteTeacher(id: string): void {
    this.teacherService.deleteTeacher(id).subscribe(
      () => {
        Swal.fire('Eliminado', 'El profesor ha sido eliminado.', 'success');
        this.getTeachers();
      },
      (error) => {
        Swal.fire(
          'Error',
          'Hubo un problema al eliminar el profesor.',
          'error'
        );
      }
    );
  }
}
