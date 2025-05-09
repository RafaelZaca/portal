import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import _config from '../../../../src/environments/environment';

export interface DestinationInfo {
  rampa: number;
  caixas: number;
}

export interface SkuInfo {
  sku: string;
  descricao: string;
  destinos: DestinationInfo[];
}

@Injectable({
  providedIn: 'root'
})
export class TriagemService {
  private apiUrl = `${_config.apiUrl}triagem`;

  constructor(private http: HttpClient) { }

  buscarSku(sku: string): Observable<SkuInfo | null> {
    return this.http.get<SkuInfo>(`${this.apiUrl}/sku/${sku}`).pipe(
      catchError(() => of(null))
    );
  }

  confirmarMovimentacao(params: {
    sku: string;
    rampa: number;
    lote: string;
    quantidade: number;
  }): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/movimentacao`, params);
  }

  getLotes(sku: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/lotes/${sku}`);
  }

  validarQuantidade(params: {
    sku: string;
    rampa: number;
    quantidade: number;
  }): Observable<{
    valido: boolean;
    mensagem?: string;
  }> {
    return this.http.post<{ valido: boolean; mensagem?: string }>(
      `${this.apiUrl}/validar-quantidade`,
      params
    );
  }
}
