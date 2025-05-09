import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import _config from '../../../../src/environments/environment';

export interface SeparacaoItem {
  sku: string;
  quantidadeEsperada: number;
  quantidadeInduzida: number;
  percentualInd: number;
  quantidadeRecebida: number;
  percentualRec: number;
  tempoUltimaCaixa: number;
  descricao: string;
  quantidadeRejeitoFinal: number;
  quantidadeRejeitoNoRead: number;
  pendente: number;
}

export interface SeparacaoInfo {
  rejeitoNoRead: number;
  pendente: number;
  itens: SeparacaoItem[];
}

@Injectable({
  providedIn: 'root'
})
export class SeparacaoService {
  private apiUrl = `${_config.apiUrl}separacao`;
  private separacaoData = new BehaviorSubject<SeparacaoInfo>({
    rejeitoNoRead: 0,
    pendente: 0,
    itens: []
  });

  constructor(private http: HttpClient) {
    this.fetchSeparacaoData();
  }

  getSeparacaoData(): Observable<SeparacaoInfo> {
    return this.separacaoData.asObservable();
  }

  updateSeparacaoData(newData: SeparacaoInfo) {
    this.separacaoData.next(newData);
  }

  private fetchSeparacaoData() {
    this.http.get<SeparacaoInfo>(this.apiUrl)
      .subscribe({
        next: (data) => {
          this.separacaoData.next(data);
        },
        error: (error) => {
          console.error('Error fetching separacao data:', error);
        }
      });
  }

  refreshSeparacaoData(): Observable<SeparacaoInfo> {
    return this.http.get<SeparacaoInfo>(this.apiUrl);
  }
}
