import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import _config from '../../../../src/environments/environment';

export interface EmbarquePickRequest {
  pickRequestId: string;
  numeroEmbarque: string;
  stopId: string;
  carMoveId: string;
}

export interface EmbarqueItem {
  sku: string;
  descricao: string;
  quantidadeEsperada: number;
  quantidadeRecebida: number;
  tempoUltimaCaixa: number;
  quantidadeRejeitoFinal: number;
  pickRequestId: string; // Adicionado
}


export interface EmbarqueInfo {
  numeroEmbarque: string;
  cliente: string;
  transportadora: string;
  customizacao: string[];
  caixasAlocadas: number;
  skusEsperados: number;
  itens: EmbarqueItem[];
  pickRequests: EmbarquePickRequest[]; // Adicionado
}


@Injectable({
  providedIn: 'root'
})
export class EmbarqueService {
  private apiUrl = `${_config.apiUrl}embarque`;
  private embarqueData = new BehaviorSubject<EmbarqueInfo | null>(null);
  private currentRampaId: number | null = null;

  constructor(private http: HttpClient) { }

  getEmbarqueData(rampaId: number): Observable<EmbarqueInfo | null> {
    // Se estamos pedindo dados para uma rampa diferente da atual,
    // limpar os dados imediatamente para não mostrar dados antigos
    if (this.currentRampaId !== rampaId) {
      this.embarqueData.next(null);
      this.currentRampaId = rampaId;
    }

    // Buscar novos dados
    this.fetchEmbarqueData(rampaId);

    // Retornar o observable
    return this.embarqueData.asObservable();
  }

  updateEmbarqueData(newData: EmbarqueInfo) {
    this.embarqueData.next(newData);
  }

  // Limpa explicitamente os dados do embarque
  clearEmbarqueData() {
    this.embarqueData.next(null);
    this.currentRampaId = null;
  }

  private fetchEmbarqueData(rampaId: number) {
    // Adicionar um timestamp para evitar cache do navegador
    const timestamp = new Date().getTime();

    this.http.get<EmbarqueInfo>(`${this.apiUrl}/${rampaId}?_t=${timestamp}`)
      .subscribe({
        next: (data) => {
          // Verificar se ainda estamos na mesma rampa antes de atualizar os dados
          if (this.currentRampaId === rampaId) {
            this.embarqueData.next(data);
          }
        },
        error: (error) => {
          // Em caso de erro, limpar os dados
          console.error('Error fetching embarque data:', error);
          if (this.currentRampaId === rampaId) {
            this.embarqueData.next(null);
          }
        }
      });
  }
  concluirEmbarque(rampaId: number): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/${rampaId}/concluir`, {});
  }
  refreshEmbarqueData(rampaId: number): Observable<EmbarqueInfo> {
    return this.http.get<EmbarqueInfo>(`${this.apiUrl}/${rampaId}`);
  }
}
