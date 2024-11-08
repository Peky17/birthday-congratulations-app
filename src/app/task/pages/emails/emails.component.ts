import { Component, OnInit } from '@angular/core';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.css'],
})
export class EmailsComponent implements OnInit {
  emails: any[] = [];

  constructor(private emailService: EmailService) {}

  ngOnInit(): void {
    this.getEmails();
  }

  getEmails(): void {
    this.emailService.getEmails().subscribe((data) => {
      this.emails = data;
    });
  }
}
