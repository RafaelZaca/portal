import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import _config from '../../../../src/environments/environment';

export interface ColunasDisponiveis {
  campo: string;
  titulo: string;
  tipo: 'texto' | 'numero' | 'data' | 'boolean';
}

export interface FiltroRelatorio {
  dataInicio?: Date;
  dataFim?: Date;
  status?: string[];
  rampas?: number[];
  colunasSelecionadas: string[];
}

export interface DadosRelatorio {
  id: string;
  data: string;
  rampa: number;
  status: string;
  numeroEmbarque: string;
  cliente: string;
  quantidadeEsperada: number;
  quantidadeSeparada: number;
  itensPendentes: number;
  percentualAtendido: number;
  dataInicio: string;
  dataFim: string;
  tempoTotal: number;
  usuarioResponsavel: string;
}

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {
  private apiUrl = `${_config.apiUrl}relatorio`;

  constructor(private http: HttpClient) { }

  getColunasDisponiveis(): Observable<ColunasDisponiveis[]> {
    return this.http.get<ColunasDisponiveis[]>(`${this.apiUrl}/colunas`);
  }

  getStatusDisponiveis(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/status`);
  }

  getRampasDisponiveis(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/rampas`);
  }

  gerarRelatorio(filtros: FiltroRelatorio): Observable<DadosRelatorio[]> {
    return this.http.post<DadosRelatorio[]>(`${this.apiUrl}/gerar`, filtros);
  }

  downloadRelatorio(dados: DadosRelatorio[], colunas: string[]): Observable<Blob> {
    return this.http.post(`${this.apiUrl}/download`, { dados, colunas },
      { responseType: 'blob' });
  }
}
