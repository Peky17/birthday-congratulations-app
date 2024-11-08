import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private baseUrl = environment.baseUrl + '/teachers';

  constructor(private httpClient: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = JSON.parse(localStorage.getItem('token')!);
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  createTeacher(data: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl, data, {
      headers: this.getAuthHeaders(),
    });
  }

  getTeachers(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.baseUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  getTeacherById(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  updateTeacher(id: string, data: any): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/${id}`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteTeacher(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
