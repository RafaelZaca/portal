// Updated WavesComponent
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PickRequest, WaveService, WaveInfo } from '../../Services/Wave.service';

@Component({
  selector: 'app-waves',
  templateUrl: './waves.component.html',
  styleUrl: './waves.component.scss'
})
export class WavesComponent implements OnInit {
  displayedColumns: string[] = [
    'select',
    'embarque',
    'stopId',
    'carMoveId',
    'delivery',
    'cliente',
    'particularidade',
    'quantidade',
    'skus',
    'status',
    'rampa'
  ];
  groupingField: string = 'STOP_NAM'
  pickRequests: PickRequest[] = [];
  selectedRequests: string[] = [];
  rampas = Array.from({ length: 12 }, (_, i) => i + 1);
  activeWave: WaveInfo | null = null;
  lockedRampas: Map<number, boolean> = new Map(); // Track locked ramps

  constructor(
    private waveService: WaveService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadActiveWave();
    this.loadPickRequests();
  }

  loadActiveWave(): void {
    this.waveService.getActiveWave().subscribe({
      next: (data: WaveInfo) => {
        this.activeWave = data.waveNumber ? data : null;

        // If there's an active wave, mark used rampas as locked
        if (this.activeWave?.pickRequests) {
          this.activeWave.pickRequests.forEach(pr => {
            if (pr.rampa) {
              this.lockedRampas.set(pr.rampa, true);
            }
          });
        }
      },
      error: (error: any) => {
        console.error('Erro ao carregar wave ativa:', error);
        this.snackBar.open('Erro ao carregar wave ativa', 'Fechar', {
          duration: 3000
        });
      }
    });
  }

  loadPickRequests(): void {
    this.waveService.getPickRequests(this.groupingField).subscribe({
      next: (data: PickRequest[]) => {
        this.pickRequests = data;

        // Atualizar as rampas bloqueadas baseado nos pick requests carregados
        this.lockedRampas.clear();

        // Agrupar os pick requests pelo campo de agrupamento selecionado
        const groupedRequests = this.groupPickRequestsByKey();

        // Processar cada grupo para determinar rampas bloqueadas
        Object.values(groupedRequests).forEach(group => {
          const allocatedRequest = group.find(pr => pr.rampa !== undefined);
          if (allocatedRequest && allocatedRequest.rampa) {
            this.lockedRampas.set(allocatedRequest.rampa, true);
          }
        });
      },
      error: (error: any) => {
        console.error('Erro ao carregar pick requests:', error);
        this.snackBar.open('Erro ao carregar os pedidos', 'Fechar', {
          duration: 3000
        });
      }
    });
  }
  groupPickRequestsByKey(): Record<string, PickRequest[]> {
    const grouped: Record<string, PickRequest[]> = {};

    this.pickRequests.forEach(pr => {
      const key = pr.groupingKey || '';
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(pr);
    });

    return grouped;
  }

  onSelectRequest(embarque: string): void {
    const index = this.selectedRequests.indexOf(embarque);
    if (index === -1) {
      this.selectedRequests.push(embarque);
    } else {
      this.selectedRequests.splice(index, 1);
    }
  }
  alocarRampa(embarque: string, rampa: number): void {
    const request = this.pickRequests.find(r => r.embarque === embarque);

    if (!request) return;

    // Se a rampa é a mesma, não faz nada
    if (request.rampa === rampa) return;

    // Agrupar os pick requests
    const groupedRequests = this.groupPickRequestsByKey();
    const groupKey = request.groupingKey || '';
    const group = groupedRequests[groupKey] || [];

    // Verificar se algum outro grupo está usando esta rampa
    const isRampaUsedByOtherGroup = this.pickRequests.some(
      pr => !group.includes(pr) && pr.rampa === rampa
    );

    if (isRampaUsedByOtherGroup) {
      this.snackBar.open('Esta rampa já está em uso por outro pedido', 'Fechar', {
        duration: 3000
      });
      return;
    }

    this.waveService.alocarRampa(embarque, rampa, this.groupingField).subscribe({
      next: () => {
        // Atualizar todos os pick requests do mesmo grupo
        group.forEach(pr => {
          pr.rampa = rampa;
        });

        // Bloquear a rampa
        this.lockedRampas.set(rampa, true);

        this.snackBar.open('Rampa alocada com sucesso', 'Fechar', {
          duration: 2000
        });
      },
      error: (error) => {
        console.error('Erro ao alocar rampa:', error);
        this.snackBar.open('Erro ao alocar rampa', 'Fechar', {
          duration: 3000
        });
      }
    });
  }

  isRampaLocked(embarque: string, rampa: number): boolean {
    const request = this.pickRequests.find(r => r.embarque === embarque);

    // If this rampa is already allocated to this request, it's not locked
    if (request?.rampa === rampa) return false;

    // Check if this rampa is locked for other requests
    return this.lockedRampas.has(rampa);
  }

  gerarWave(): void {
    // Filter pick requests that don't have a rampa allocated
    const pickRequestsSemRampa = this.pickRequests.filter(req => !req.rampa);

    if (pickRequestsSemRampa.length > 0) {
      this.snackBar.open('Existem pedidos sem rampa alocada', 'Fechar', {
        duration: 3000
      });
      return;
    }

    // Get embarques from pickRequests with allocated rampas
    const embarques = this.pickRequests
      .filter(req => req.rampa !== undefined)
      .map(req => req.embarque);

    if (embarques.length === 0) {
      this.snackBar.open('Nenhum pedido selecionado para gerar wave', 'Fechar', {
        duration: 3000
      });
      return;
    }

    this.waveService.gerarWave(embarques).subscribe({
      next: (response) => {
        this.snackBar.open(`Wave ${response.waveNumber} gerada com sucesso`, 'Fechar', {
          duration: 3000
        });

        // Reload the active wave and pick requests
        this.loadActiveWave();
        this.loadPickRequests();
      },
      error: (error: any) => {
        console.error('Erro ao gerar wave:', error);
        this.snackBar.open('Erro ao gerar wave', 'Fechar', {
          duration: 3000
        });
      }
    });
  }

  cancelarSelecao(): void {
    this.selectedRequests = [];
  }

  desassociar(): void {
    if (this.selectedRequests.length === 0) {
      return;
    }

    this.waveService.desassociarRampas(this.selectedRequests).subscribe({
      next: () => {
        this.selectedRequests.forEach(embarque => {
          const request = this.pickRequests.find(r => r.embarque === embarque);
          if (request && request.rampa) {
            // Unlock this rampa
            this.lockedRampas.delete(request.rampa);
            request.rampa = undefined;
          }
        });

        this.selectedRequests = [];
        this.snackBar.open('Rampas desassociadas com sucesso', 'Fechar', {
          duration: 2000
        });
      },
      error: (error: any) => {
        console.error('Erro ao desassociar rampas:', error);
        this.snackBar.open('Erro ao desassociar rampas', 'Fechar', {
          duration: 3000
        });
      }
    });
  }

  hasSelectedRequests(): boolean {
    return this.selectedRequests.length > 0;
  }

  // Check if there are any active pickRequests for the current wave
  hasActivePickRequests(): boolean {
    if (this.activeWave) {
      return this.activeWave!.pickRequests?.length > 0 || false;
    }
    return false;
  }
}
