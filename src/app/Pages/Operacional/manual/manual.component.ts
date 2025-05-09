import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TriagemService, SkuInfo } from '../../Services/Manual.service';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.component.html',
  styleUrl: './manual.component.scss'
})
export class ManualComponent implements OnInit {
  form: FormGroup;
  skuInfo: SkuInfo | null = null;
  lotes: string[] = [];
  carregandoSku = false;
  rampaAtual: number | null = null;

  constructor(
    private fb: FormBuilder,
    private triagemService: TriagemService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      sku: ['', Validators.required],
      rampa: ['', Validators.required],
      lote: ['', Validators.required],
      quantidade: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    // Observa mudanças no SKU
    const skuControl = this.form.get('sku');
    if (skuControl) {
      skuControl.valueChanges.subscribe(value => {
        if (value && value.length >= 8) {
          this.buscarSku(value);
        } else {
          this.skuInfo = null;
        }
      });
    }
  }

  buscarSku(sku: string): void {
    this.carregandoSku = true;
    this.triagemService.buscarSku(sku).subscribe({
      next: (info) => {
        this.skuInfo = info;
        if (info) {
          this.carregarLotes(sku);
        } else {
          this.snackBar.open('SKU não encontrado', 'Fechar', { duration: 3000 });
        }
      },
      error: (error) => {
        this.snackBar.open('Erro ao buscar SKU', 'Fechar', { duration: 3000 });
      },
      complete: () => {
        this.carregandoSku = false;
      }
    });
  }

  carregarLotes(sku: string): void {
    this.triagemService.getLotes(sku).subscribe(lotes => {
      this.lotes = lotes;
    });
  }

  selecionarRampa(rampa: number): void {
    this.rampaAtual = rampa;
    this.form.patchValue({ rampa });
  }

  confirmar(): void {
    if (this.form.invalid) {
      return;
    }
    const dados = this.form.value;
    // Valida quantidade
    this.triagemService.validarQuantidade({
      sku: dados.sku,
      rampa: dados.rampa,
      quantidade: dados.quantidade
    }).subscribe({
      next: (resultado) => {
        if (resultado.valido) {
          this.enviarConfirmacao(dados);
        } else {
          this.snackBar.open(resultado.mensagem || 'Erro de validação', 'Fechar', { duration: 3000 });
        }
      }
    });
  }

  private enviarConfirmacao(dados: any): void {
    this.triagemService.confirmarMovimentacao(dados).subscribe({
      next: (sucesso) => {
        if (sucesso) {
          this.snackBar.open('Movimentação confirmada com sucesso', 'Fechar', { duration: 3000 });
          this.form.reset();
          this.skuInfo = null;
          this.rampaAtual = null;
        } else {
          this.snackBar.open('Erro ao confirmar movimentação', 'Fechar', { duration: 3000 });
        }
      },
      error: () => {
        this.snackBar.open('Erro ao confirmar movimentação', 'Fechar', { duration: 3000 });
      }
    });
  }
}
