import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import _config from '../../../../src/environments/environment';

export interface RejeitoItem {
  sku: string;
  wave: string;
  totalRejeito: number;
  rampa01: number;
  rampa02: number;
  rampa03: number;
  rampa04: number;
  rampa05: number;
  rampa06: number;
  rampa07: number;
  rampa08: number;
  rampa09: number;
  rampa10: number;
  rampa11: number;
  rampa12: number;
  naoPrevisto: number;
  excesso: number;
  descricao?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RejeitoService {
  private apiUrl = `${_config.apiUrl}rejeitooverview`;
  private rejeitoData = new BehaviorSubject<RejeitoItem[]>([]);

  constructor(private http: HttpClient) {
    this.fetchRejeitoData();
  }

  getRejeitoData(): Observable<RejeitoItem[]> {
    return this.rejeitoData.asObservable();
  }

  updateRejeitoData(newData: RejeitoItem[]) {
    this.rejeitoData.next(newData);
  }

  fetchRejeitoData() {
    this.http.get<RejeitoItem[]>(this.apiUrl)
      .subscribe({
        next: (data) => {
          this.rejeitoData.next(data);
        },
        error: (error) => {
          console.error('Error fetching rejeito data:', error);
        }
      });
  }

  refreshRejeitoData(): Observable<RejeitoItem[]> {
    return this.http.get<RejeitoItem[]>(this.apiUrl);
  }
}
