import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog';
import { CpfPipe } from '../../pipes/cpf-pipe';
import { SeguradoService } from '../../services/segurado/segurado-service';
import { Spinner } from '../../components/spinner/spinner';

@Component({
  selector: 'app-segurado',
  imports: [CommonModule, RouterModule, CpfPipe, Spinner],
  templateUrl: './segurado.html',
  styleUrl: './segurado.scss',
})
export class Segurado {
  lista: any[] = [];
  processando = true;

  constructor(private seguradoService: SeguradoService, private dialog: MatDialog) {}

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

  private carregarLista() {
    this.processando = true;
    this.seguradoService.getAll().subscribe({
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
