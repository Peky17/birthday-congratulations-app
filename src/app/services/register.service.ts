import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  registrarUsuario(data: any) {
    return this.httpClient
      .post<any>(this.baseUrl + '/auth/registrar', data)
      .pipe(
        tap((res) => {
          if (res.ok === true) {
            res.msg;
          } else {
            res.msg
          }
        }),
        map((res) => res.ok),
        catchError((err) => of(err.error.msg))
      );
  }
}
