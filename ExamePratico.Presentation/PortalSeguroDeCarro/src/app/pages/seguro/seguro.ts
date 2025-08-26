import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog';
import { SeguroService } from '../../services/seguro/seguro-service';
import { Spinner } from '../../components/spinner/spinner';

@Component({
  selector: 'app-seguro',
  imports: [CommonModule, RouterModule, Spinner],
  templateUrl: './seguro.html',
  styleUrl: './seguro.scss',
})
export class Seguro implements OnInit {
  lista: any[] = [];
  processando = true;

  constructor(private seguroService: SeguroService, private dialog: MatDialog) {}

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
        this.seguroService.delete(segurado.seguradoId).subscribe({
          next: () => {
            this.carregarLista();
          },
        });
      }
    });
  }

  private carregarLista() {
    this.processando = true;
    this.seguroService.getAll().subscribe({
      next: (sucesso) => {
        this.lista = sucesso;
        this.processando = false;
      },
      error: (e) => {
        console.error(e);
      },
    });
  }
}
