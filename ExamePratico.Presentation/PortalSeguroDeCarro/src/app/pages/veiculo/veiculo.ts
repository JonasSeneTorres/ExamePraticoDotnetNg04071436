import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';

import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog';
import { Spinner } from '../../components/spinner/spinner';
import { VeiculoService } from '../../services/veiculo/veiculo-service';

@Component({
  selector: 'app-veiculo',
  imports: [CommonModule, RouterModule, Spinner],
  templateUrl: './veiculo.html',
  styleUrl: './veiculo.scss',
})
export class Veiculo {
  lista: any[] = [];
  processando = true;

  constructor(
    private veiculoService: VeiculoService,
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
        this.veiculoService.delete(segurado.veiculoId).subscribe({
          next: () => {
            this.carregarLista();
          },
        });
      }
    });
  }

  private carregarLista() {
    this.processando = true;
    this.veiculoService.getAll().subscribe({
      next: (sucesso) => {
        this.lista = sucesso;
        this.processando = false;
      },
      error: (e) => {
        this.router.navigate(['/erro']);
      },
    });
  }
}
