import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import _config from '../../../../src/environments/environment';

export interface Permissao {
  id: string;
  nome: string;
  descricao: string;
}

export interface Grupo {
  id: number;
  nome: string;
  descricao: string;
  permissoes: string[];
  ativo: boolean;
  dataCriacao: string;
  usuariosVinculados: number;
}

@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  private apiUrl = `${_config.apiUrl}grupo`;

  constructor(private http: HttpClient) { }

  getGrupos(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(this.apiUrl);
  }

  getPermissoes(): Observable<Permissao[]> {
    return this.http.get<Permissao[]>(`${this.apiUrl}/permissoes`);
  }

  getGrupo(id: number): Observable<Grupo> {
    return this.http.get<Grupo>(`${this.apiUrl}/${id}`);
  }

  salvarGrupo(grupo: Grupo): Observable<Grupo> {
    if (grupo.id) {
      return this.http.put<Grupo>(`${this.apiUrl}/${grupo.id}`, grupo);
    } else {
      return this.http.post<Grupo>(this.apiUrl, grupo);
    }
  }

  excluirGrupo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
