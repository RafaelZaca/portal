import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import _config from '../../../../src/environments/environment';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  login: string;
  senha?: string;
  grupo: string;
  ativo: boolean;
  dataCriacao: string;
  ultimoAcesso?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // Adicionando '/' antes do 'usuario' para garantir que a URL está correta
  private apiUrl = `${_config.apiUrl}Usuario`;

  constructor(private http: HttpClient) {
    console.log('API URL:', this.apiUrl); // Para debug
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  getGrupos(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/grupos`);
  }

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  salvarUsuario(usuario: Usuario): Observable<Usuario> {
    console.log('Salvando usuário:', usuario); // Para debug
    console.log('URL:', this.apiUrl); // Para debug

    if (usuario.id) {
      return this.http.put<Usuario>(`${this.apiUrl}/${usuario.id}`, usuario);
    } else {
      return this.http.post<Usuario>(this.apiUrl, usuario);
    }
  }

  excluirUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
