import { Component, OnInit } from '@angular/core';
import { EmailService } from 'src/app/services/email.service';
import { TeacherService } from 'src/app/services/teacher.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.css'],
})
export class EmailsComponent implements OnInit {
  emails: any[] = [];

  constructor(
    private emailService: EmailService,
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    this.getEmails();
  }

  getEmails(): void {
    this.emailService.getEmails().subscribe((data) => {
      this.emails = data;
    });
  }

  generateEmail(emailData: any): void {
    // 1. Obtener datos del email
    const message = emailData.message;
    const teacherId = emailData.teacherId;
    // 2. Obtener datos del profesor
    this.teacherService.getTeacherById(teacherId).subscribe((teacherData) => {
      const teacherEmail = teacherData.email;
      const teacherName = teacherData.name;
      // 3. Send email
      this.emailService
        .sendEmailToAnyPerson({
          to: teacherEmail,
          subject: 'Felicitación de cumpleaños',
          message: message,
          name: teacherName,
        })
        .subscribe(() => {
          console.log('Email sent');
          Swal.fire(
            'Email enviado',
            'El email ha sido enviado al profesor con éxito',
            'success'
          );
        });
    });
  }
}
