import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private baseUrl = environment.baseUrl + '/emails';

  constructor(private httpClient: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = JSON.parse(localStorage.getItem('token')!);
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  sendEmail(data: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl, data, {
      headers: this.getAuthHeaders(),
    });
  }

  getEmails(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.baseUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  getEmailById(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  updateEmail(id: string, data: any): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/${id}`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteEmail(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Send email to all teachers that birthday is today
  sendBirthdayEmail(): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.baseUrl}/schedule/check-teacher-birthdays`,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  // Send an email to any person (teacher, student, etc)
  sendEmailToAnyPerson(data: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.baseUrl}/mail/sendEmailToTeacher`,
      data,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }
}
