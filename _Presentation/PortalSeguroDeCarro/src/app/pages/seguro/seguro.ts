import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SeguroService } from '../../services/seguro/seguro-service';

@Component({
  selector: 'app-seguro',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './seguro.html',
  styleUrl: './seguro.scss',
})
export class Seguro implements OnInit {
  lista: any[] = [];

  constructor(private seguroService: SeguroService) {}

  ngOnInit(): void {
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
