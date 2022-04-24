import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { StorageService } from './storage.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  public baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private _storage: StorageService, private _auth: AuthService) { }

  registro(registro: any): Observable<any> {

    if (registro.correo) {
      registro.correo = registro.correo.trim().toLowerCase();
    }

    return this.http.post(`${this.baseUrl}/registro.php`, registro).pipe(
      map((respuesta: any) => {
        if (respuesta) {
          this._storage.setItem("user", { ...respuesta });
          this._auth.setUser();
        }
        return respuesta;
      }),
      catchError(this.handleError)
    )

  }

  obtenerTodos(): Observable<any> {

    return this.http.get(`${this.baseUrl}/getAll.php`).pipe(
      map((respuesta: any) => {
        return respuesta;
      }),
      catchError(this.handleError)
    )

  }

  contadorUsuarios(): Observable<any> {

    return this.http.get(`${this.baseUrl}/contadorUsuarios.php`).pipe(
      map((respuesta: any) => {
        return respuesta;
      }),
      catchError(this.handleError)
    )

  }

  actualizarUsuario(usuario: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update.php`, usuario).pipe(
      map((respuesta: any) => {
        return respuesta;
      }),
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }


}