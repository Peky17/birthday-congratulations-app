import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, catchError, map, of, tap } from 'rxjs';

interface TareaResponse {
  tareas: any[]; // Ajusta el tipo de 'tareas' según la estructura real de tus datos
}

@Injectable({
  providedIn: 'root',
})
export class TareasService {
  private baseUrl = environment.baseUrl;

  private _user: any = JSON.parse(localStorage.getItem('user')!);

  get user() {
    return this._user;
  }

  readTareas(): Observable<TareaResponse> {
    // Usa la interfaz aquí
    const headers = {
      'x-auth-token': this.user.token,
    };

    return this.httpClient.get<TareaResponse>(`${this.baseUrl}/task/read`, {
      headers,
    });
  }

  addTarea(data: any) {
    const headers = {
      'x-auth-token': this.user.token,
    };

    return this.httpClient
      .post<any>(this.baseUrl + '/task/create', data, { headers })
      .pipe(
        tap((res) => {
          if (res.ok === true) {
            res.msg;
          } else {
            res.msg;
          }
        }),
        map((res) => res.ok),
        catchError((err) => of(err.error.msg))
      );
  }

  eliminarTarea(idTarea: string) {
    const headers = {
      'x-auth-token': this.user.token,
    };

    return this.httpClient
      .delete<any>(`${this.baseUrl}/task/delete/${idTarea}`, { headers })
      .pipe(
        tap((res) => {
          if (res.ok === true) {
            res.msg;
          } else {
            res.msg;
          }
        }),
        map((res) => res.ok),
        catchError((err) => of(err.error.msg))
      );
  }

  actualizarTarea(data: any, idTarea: string) {
    const headers = {
      'x-auth-token': this.user.token,
    };

    return this.httpClient
      .put<any>(`${this.baseUrl}/task/update/${idTarea}`, data, {
        headers,
      })
      .pipe(
        tap((res) => {
          if (res.ok === true) {
            res.msg;
          } else {
            res.msg;
          }
        }),
        map((res) => res.ok),
        catchError((err) => of(err.error.msg))
      );
  }

  constructor(private httpClient: HttpClient) {}
}
