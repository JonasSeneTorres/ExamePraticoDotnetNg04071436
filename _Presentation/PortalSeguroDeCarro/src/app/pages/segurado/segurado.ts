import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CpfPipe } from '../../pipes/cpf-pipe';
import { SeguradoService } from '../../services/segurado/segurado-service';

@Component({
  selector: 'app-segurado',
  imports: [
    CommonModule,
    RouterModule,
    CpfPipe
  ],
  templateUrl: './segurado.html',
  styleUrl: './segurado.scss',
})
export class Segurado {
  lista: any[] = [];

  constructor(private seguradoService: SeguradoService) {}

  ngOnInit(): void {
    this.seguradoService.getAll().subscribe({
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
