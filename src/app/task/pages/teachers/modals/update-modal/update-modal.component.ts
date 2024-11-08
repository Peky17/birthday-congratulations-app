import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TeacherService } from 'src/app/services/teacher.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.css'],
})
export class UpdateModalComponent implements OnInit {
  @Input() teacher: any;
  updateForm!: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      name: [this.teacher.name, Validators.required],
      email: [this.teacher.email, [Validators.required, Validators.email]],
      phone: [this.teacher.phone, Validators.required],
      address: [this.teacher.address, Validators.required],
      birthdate: [this.teacher.birthdate, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      this.teacherService
        .updateTeacher(this.teacher.id, this.updateForm.value)
        .subscribe(
          (response) => {
            this.activeModal.close('updated');
          },
          (error) => {
            console.error('Error updating teacher', error);
          }
        );
    } else {
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
    }
  }
}
