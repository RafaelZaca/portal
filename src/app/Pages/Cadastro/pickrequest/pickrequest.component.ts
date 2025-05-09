import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PickRequest, PickRequestService } from '../../Services/PickRequest.service';
import { ConfirmDialogComponent } from '../../../Common/modal/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-pickrequest',
  templateUrl: './pickrequest.component.html',
  styleUrl: './pickrequest.component.scss'
})
export class PickRequestComponent implements OnInit {
  displayedColumns: string[] = [
    'numeroEmbarque',
    'stopId',
    'delivery',
    'cliente',
    'particularidade',
    'quantidade',
    'skus',
    'status',
    'rampa',
    'acoes'
  ];

  pickRequests: PickRequest[] = [];

  constructor(
    private pickRequestService: PickRequestService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.carregarPickRequests();
  }

  carregarPickRequests(): void {
    this.pickRequestService.getPickRequests()
      .subscribe(data => {
        this.pickRequests = data;
      });
  }

  concluirPickRequest(pr: PickRequest): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar conclusão',
        message: `Deseja realmente concluir o pick request do embarque ${pr.numeroEmbarque}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pickRequestService.concluirPickRequest(pr.id).subscribe({
          next: () => {
            this.snackBar.open('Pick request concluído com sucesso', 'Fechar', {
              duration: 3000
            });
            this.carregarPickRequests();
          },
          error: () => {
            this.snackBar.open('Erro ao concluir pick request', 'Fechar', {
              duration: 3000
            });
          }
        });
      }
    });
  }

  cancelarPickRequest(pr: PickRequest): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar cancelamento',
        message: `Deseja realmente cancelar o pick request do embarque ${pr.numeroEmbarque}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pickRequestService.cancelarPickRequest(pr.id).subscribe({
          next: () => {
            this.snackBar.open('Pick request cancelado com sucesso', 'Fechar', {
              duration: 3000
            });
            this.carregarPickRequests();
          },
          error: () => {
            this.snackBar.open('Erro ao cancelar pick request', 'Fechar', {
              duration: 3000
            });
          }
        });
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Em Execução': return 'status-em-execucao';
      case 'Concluído': return 'status-concluido';
      case 'Cancelado': return 'status-cancelado';
      default: return 'status-pendente';
    }
  }
}
