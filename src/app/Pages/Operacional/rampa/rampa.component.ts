import { Component, OnInit } from '@angular/core';
import { RampaService, RampaInfo } from '../../Services/Rampa.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../../Common/modal/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-rampa',
  templateUrl: './rampa.component.html',
  styleUrl: './rampa.component.scss'
})
export class RampaComponent implements OnInit {
  displayedColumns: string[] = [
    'numero',
    'numeroEmbarque',
    'cliente',
    'status',
    'quantidadeSolicitada',
    'quantidadeSeparada',
    'itensPendentes',
    'percentualAtendido',
    'acoes'
  ];

  rampas: RampaInfo[] = [];

  constructor(
    private rampaService: RampaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadRampasData();
  }

  loadRampasData(): void {
    this.rampaService.getRampasData()
      .subscribe(data => {
        this.rampas = data;
      });
  }

  concluirEmbarque(rampa: RampaInfo): void {
    if (rampa.itensPendentes !== 0) {
      // Abrir diálogo de confirmação
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Confirmar conclusão',
          message: 'Este embarque ainda possui itens pendentes. Deseja concluí-lo mesmo assim?'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.executarConclusao(rampa);
        }
      });
    } else {
      this.executarConclusao(rampa);
    }
  }

  private executarConclusao(rampa: RampaInfo): void {
    this.rampaService.concluirEmbarque(rampa.numero)
      .subscribe({
        next: () => {
          this.snackBar.open('Embarque concluído com sucesso', 'Fechar', {
            duration: 3000
          });
          this.loadRampasData(); // Recarrega os dados
        },
        error: (error) => {
          this.snackBar.open('Erro ao concluir embarque', 'Fechar', {
            duration: 3000
          });
        }
      });
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'completo':
        return 'status-completo';
      case 'em separação':
        return 'status-em-separacao';
      case 'vazio':
        return 'status-vazio';
      default:
        return '';
    }
  }
}
