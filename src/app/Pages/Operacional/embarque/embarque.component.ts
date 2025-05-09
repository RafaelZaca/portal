// src/app/Pages/Operacional/embarque/embarque.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmbarqueService, EmbarqueInfo, EmbarquePickRequest } from '../../Services/Embarque.service';

@Component({
  selector: 'app-embarque',
  templateUrl: './embarque.component.html',
  styleUrl: './embarque.component.scss'
})
export class EmbarqueComponent implements OnInit {
  displayedColumns: string[] = [
    'sku',
    'quantidadeEsperada',
    'quantidadeRecebida',
    'tempoUltimaCaixa',
    'descricao',
    'quantidadeRejeitoFinal',
    'pickRequest' // Nova coluna
  ];
  embarqueInfo: EmbarqueInfo | null = null;
  rampaId: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private embarqueService: EmbarqueService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // Limpar dados explicitamente
    this.embarqueInfo = null;

    this.route.params.subscribe(params => {
      // Limpar dados antes de mudar a rampa
      this.embarqueInfo = null;

      this.rampaId = +params['id']; // converter string para número
      this.loadEmbarqueData();
    });
  }

  loadEmbarqueData(): void {
    try {
      this.embarqueService.getEmbarqueData(this.rampaId)
        .subscribe({
          next: (data: any) => {
            this.embarqueInfo = data;
            console.log('Embarque info:', this.embarqueInfo);
          },
          error: (error) => {
            // Limpar dados em caso de erro
            this.embarqueInfo = null;
            console.log('Error loading embarque data:', error);
            this.snackBar.open('Erro ao carregar dados do embarque', 'Fechar', {
              duration: 3000
            });
          }
        });
    }
    catch (_error: any) {
      // Limpar dados em caso de exceção
      this.embarqueInfo = null;
      console.log('Exception loading embarque data:', _error);
      this.snackBar.open('Erro ao carregar dados do embarque', 'Fechar', {
        duration: 3000
      });
    }
  }

  getProgressoTotal(): number {
    if (!this.embarqueInfo) return 0;
    const totalRecebido = this.embarqueInfo.itens.reduce((acc, item) => acc + (item.quantidadeRecebida || 0), 0);
    const totalEsperado = this.embarqueInfo.itens.reduce((acc, item) => acc + (item.quantidadeEsperada || 0), 0);
    return totalEsperado > 0 ? (totalRecebido / totalEsperado) * 100 : 0;
  }

  // Método para obter o número de embarque a partir do pickRequestId
  getPickRequestEmbarque(pickRequestId: string): string {
    if (!this.embarqueInfo || !this.embarqueInfo.pickRequests) return '-';

    const pickRequest = this.embarqueInfo.pickRequests.find(pr => pr.pickRequestId === pickRequestId);
    return pickRequest ? pickRequest.numeroEmbarque : '-';
  }

  // Método para concluir o embarque
  concluirEmbarque(): void {
    if (confirm('Tem certeza que deseja concluir este embarque?')) {
      this.embarqueService.concluirEmbarque(this.rampaId).subscribe({
        next: () => {
          this.snackBar.open('Embarque concluído com sucesso', 'Fechar', {
            duration: 3000
          });
          // Recarregar os dados ou redirecionar
          this.router.navigate(['/operacional/rampa']);
        },
        error: (error) => {
          console.error('Erro ao concluir embarque:', error);
          this.snackBar.open('Erro ao concluir embarque', 'Fechar', {
            duration: 3000
          });
        }
      });
    }
  }
}
