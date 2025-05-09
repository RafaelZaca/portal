// Updated WaveService
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import _config from '../../../../src/environments/environment';

export interface PickRequest {
  embarque: string;
  stopId: string;
  carMoveId: string; // Novo campo
  delivery: string;
  cliente: string;
  particularidade: string;
  quantidade: number;
  skus: number;
  status: string;
  rampa?: number;
  groupingKey?: string; // Chave de agrupamento
}


export interface WaveInfo {
  waveNumber: string;
  status: string;
  createdAt: string;
  pickRequests: PickRequest[];
}

@Injectable({
  providedIn: 'root'
})
export class WaveService {
  private apiUrl = `${_config.apiUrl}wave`;

  constructor(private http: HttpClient) { }

  getPickRequests(groupingField: string = 'STOP_NAM'): Observable<PickRequest[]> {
    return this.http.get<PickRequest[]>(`${this.apiUrl}/pickrequests?groupingField=${groupingField}`);
  }

  alocarRampa(embarque: string, rampa: number, groupingField: string = 'STOP_NAM'): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/alocar-rampa?groupingField=${groupingField}`, { embarque, rampa });
  }


  gerarWave(embarques: string[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/gerar`, embarques);
  }

  desassociarRampas(embarques: string[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/desassociar`, embarques);
  }

  getActiveWave(): Observable<WaveInfo> {
    return this.http.get<WaveInfo>(`${this.apiUrl}/active`);
  }
}
