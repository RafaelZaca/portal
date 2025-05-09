import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RelatorioService, ColunasDisponiveis, DadosRelatorio } from '../../Services/Relatorio.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-geral',
  templateUrl: './geral.component.html',
  styleUrl: './geral.component.scss'
})
export class GeralComponent implements OnInit {
  form: FormGroup;
  colunasDisponiveis: ColunasDisponiveis[] = [];
  statusDisponiveis: string[] = [];
  rampasDisponiveis: number[] = [];
  dadosRelatorio: DadosRelatorio[] = [];
  displayedColumns: string[] = [];

  constructor(
    private fb: FormBuilder,
    private relatorioService: RelatorioService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      dataInicio: [null],
      dataFim: [null],
      status: [[]],
      rampas: [[]],
      colunas: [[]]
    });
  }

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.relatorioService.getColunasDisponiveis().subscribe(colunas => {
      this.colunasDisponiveis = colunas;
    });

    this.relatorioService.getStatusDisponiveis().subscribe(status => {
      this.statusDisponiveis = status;
    });

    this.relatorioService.getRampasDisponiveis().subscribe(rampas => {
      this.rampasDisponiveis = rampas;
    });
  }

  gerarRelatorio(): void {
    const filtros = {
      dataInicio: this.form.get('dataInicio')!.value,
      dataFim: this.form.get('dataFim')!.value,
      status: this.form.get('status')!.value,
      rampas: this.form.get('rampas')!.value,
      colunasSelecionadas: this.form.get('colunas')!.value
    };

    this.relatorioService.gerarRelatorio(filtros).subscribe(dados => {
      this.dadosRelatorio = dados;
      this.displayedColumns = filtros.colunasSelecionadas;
    });
  }

  downloadRelatorio(): void {
    if (!this.dadosRelatorio.length) {
      this.snackBar.open('Nenhum dado para baixar', 'Fechar', { duration: 3000 });
      return;
    }

    this.relatorioService.downloadRelatorio(
      this.dadosRelatorio,
      this.displayedColumns
    ).subscribe({
      next: () => {
        this.snackBar.open('Download iniciado', 'Fechar', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('Erro ao baixar relatório', 'Fechar', { duration: 3000 });
      }
    });
  }

  limparFiltros(): void {
    this.form.reset();
    this.dadosRelatorio = [];
    this.displayedColumns = [];
  }

  marcarTodasColunas(): void {
    const todasColunas = this.colunasDisponiveis.map(c => c.campo);
    this.form.patchValue({ colunas: todasColunas });
  }

  desmarcarTodasColunas(): void {
    this.form.patchValue({ colunas: [] });
  }
}
