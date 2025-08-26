import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog';
import { SeguroService } from '../../services/seguro/seguro-service';

@Component({
  selector: 'app-seguro',
  imports: [CommonModule, RouterModule],
  templateUrl: './seguro.html',
  styleUrl: './seguro.scss',
})
export class Seguro implements OnInit {
  lista: any[] = [];

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
        console.log(segurado.seguradoId);
        this.seguroService.delete(segurado.seguradoId).subscribe({
          next: () => {
            this.carregarLista();
          },
        });
      } else {
        console.log('Usuário cancelou ❌');
      }
    });
  }

  private carregarLista() {
    this.seguroService.getAll().subscribe({
      next: (sucesso) => {
        this.lista = sucesso;
        console.log(sucesso);
      },
      error: (e) => {
        console.error(e);
      },
    });
  }
}
