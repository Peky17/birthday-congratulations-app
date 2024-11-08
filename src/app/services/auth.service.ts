import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl = environment.baseUrl;

  private _user: any = {};

  get user() {
    return this._user;
  }

  login(data: any) {
    return this.httpClient.post<any>(this.baseUrl + '/auth/login', data).pipe(
      map((res) => {
        // Validate if the response contains a token
        if (res.token) {
          return res;
        }

        return 'Error al iniciar sesión';
      }),
      catchError((err) => {
        return of(err.error.message);
      })
    );
  }

  // Validate if the token is in the local storage
  validarToken(): Observable<boolean> {
    const token = JSON.parse(localStorage.getItem('token')!);
    if (token) {
      return new Observable((suscriber) => {
        suscriber.next(true);
      });
    } else {
      return new Observable((suscriber) => {
        suscriber.next(false);
      });
    }
  }
}
