import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VeiculoService } from '../../services/veiculo/veiculo-service';

@Component({
  selector: 'app-veiculo',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './veiculo.html',
  styleUrl: './veiculo.scss'
})
export class Veiculo {
lista: any[] = [];

  constructor(private veiculoService: VeiculoService) {}

  ngOnInit(): void {
    this.veiculoService.getAll().subscribe({
      next: (sucesso) => {
        this.lista = sucesso;
      },
      error: (e) => {
        console.error(e);
      },
    });
  }
}
