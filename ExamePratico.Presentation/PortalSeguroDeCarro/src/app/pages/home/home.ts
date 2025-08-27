import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';

import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog';
import { formatNumberToCurrency } from '../../utilitaries-function/parseNumberToCurrent';
import { SeguroService } from '../../services/seguro/seguro-service';
import { Spinner } from '../../components/spinner/spinner';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, Spinner],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  lista: any[] = [];
  processando = true;

  constructor(
    private seguradoService: SeguroService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarLista();
  }

  openDialog(segurado: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirmação',
        message: `Você realmente deseja excluir "${segurado.nome}"?Essa ação é irreversível.`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.seguradoService.delete(segurado.seguradoId).subscribe({
          next: () => {
            this.carregarLista();
          },
        });
      }
    });
  }

  formatNumberToCurrency(value: number) {
    return formatNumberToCurrency(value);
  }

  baixarRelatorioJson() {
    this.seguradoService.getRelatorio().subscribe({
      next: (sucesso) => {
        this.downloadJson(sucesso, 'relatorio.json');
      },
    });
  }

  downloadJson(data: any, fileName: string = 'arquivo.json'): void {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  private carregarLista() {
    this.processando = true;

    this.seguradoService.getMedia().subscribe({
      next: (sucesso) => {
        this.lista = sucesso;
        this.lista.forEach((item) => {
          item.mediaValorDoSeguro = formatNumberToCurrency(item.mediaValorDoSeguro);
        });

        this.processando = false;
      },
      error: (e) => {
        // this.router.navigate(['/erro']);
      },
    });
  }
}
