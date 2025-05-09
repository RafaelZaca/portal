import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map, switchMap } from 'rxjs/operators';
import _config from '../../../../src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  role: string;
}

interface Permission {
  id: string;
  name: string;
  resource: string;
}

interface LoginDto {
  userName: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public _UserInfo: any
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_info';
  private apiUrl = `${_config.apiUrl}`;

  constructor(private http: HttpClient,
    private _jwtHelper: JwtHelperService,) { }


  login(username: string, password: string): Observable<any> {
    const loginDto: LoginDto = {
      userName: username,
      password: password
    };

    return this.http.post<LoginResponse>(`${this.apiUrl}Auth`, loginDto)
      .pipe(
        switchMap(response => {
          // Salvar token
          localStorage.setItem(this.TOKEN_KEY, response.token);

          // Decodificar o token
          this._UserInfo = this._jwtHelper.decodeToken(response.token);
          localStorage.setItem('username', this._UserInfo.name);
          localStorage.setItem('userid', this._UserInfo.ID);

          // Buscar permissões do usuário
          return this.fetchUserPermissions(this._UserInfo.ID).pipe(
            map(permissions => {
              localStorage.setItem('user_permissions', JSON.stringify(permissions));
              return response; // Retornar a resposta original do login
            })
          );
        }),
        catchError(error => {
          console.error('Erro de login:', error);
          return throwError(() => ({
            error: {
              message: error.error?.message || 'Erro ao fazer login. Verifique suas credenciais.'
            }
          }));
        })
      );
  }


  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUser(): User | null {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  hasPermission(permissionId: string): boolean {
    // Obter as permissões do usuário do localStorage
    const userPermissions = this.getUserPermissions();
    return userPermissions.includes(permissionId);
  }
  // Método para obter as permissões do usuário
  getUserPermissions(): string[] {
    const userData = localStorage.getItem('user_permissions');
    return userData ? JSON.parse(userData) : [];
  }

  fetchUserPermissions(userId: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}usuario/${userId}/permissoes`);
  }


  validateToken(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/Auth/validate`)
      .pipe(
        catchError(() => {
          this.logout();
          return throwError(() => new Error('Token inválido'));
        })
      );
  }
}
