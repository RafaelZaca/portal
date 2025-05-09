import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import _config from '../../../../src/environments/environment';

export interface PickRequest {
  id: string;
  numeroEmbarque: string;
  stopId: string;
  delivery: string;
  cliente: string;
  particularidade: string;
  quantidade: number;
  skus: number;
  status: 'Pendente' | 'Em Execução' | 'Concluído' | 'Cancelado';
  rampa?: number;
  dataInicio?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PickRequestService {
  private apiUrl = `${_config.apiUrl}pickrequest`;

  constructor(private http: HttpClient) { }

  getPickRequests(): Observable<PickRequest[]> {
    return this.http.get<PickRequest[]>(this.apiUrl);
  }

  concluirPickRequest(id: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/${id}/concluir`, {});
  }

  cancelarPickRequest(id: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/${id}/cancelar`, {});
  }
}
