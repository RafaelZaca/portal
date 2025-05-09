import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import _config from '../../../../src/environments/environment';

export interface RampaInfo {
  numero: number;
  numeroEmbarque: string;
  cliente: string;
  status: string;
  quantidadeSolicitada: number;
  quantidadeSeparada: number;
  itensPendentes: number;
  percentualAtendido: number;
}

@Injectable({
  providedIn: 'root'
})
export class RampaService {
  private apiUrl = `${_config.apiUrl}rampas`;
  private rampasData = new BehaviorSubject<RampaInfo[]>([]);

  constructor(private http: HttpClient) {
    this.fetchRampasData();
  }

  getRampasData(): Observable<RampaInfo[]> {
    return this.rampasData.asObservable();
  }

  updateRampasData(newData: RampaInfo[]) {
    this.rampasData.next(newData);
  }

  private fetchRampasData() {
    this.http.get<RampaInfo[]>(this.apiUrl)
      .subscribe({
        next: (data) => {
          this.rampasData.next(data);
        },
        error: (error) => {
          console.error('Error fetching rampas data:', error);
        }
      });
  }

  refreshRampasData(): Observable<RampaInfo[]> {
    return this.http.get<RampaInfo[]>(this.apiUrl);
  }

  concluirEmbarque(rampaId: number): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/${rampaId}/concluir`, {});
  }
}
