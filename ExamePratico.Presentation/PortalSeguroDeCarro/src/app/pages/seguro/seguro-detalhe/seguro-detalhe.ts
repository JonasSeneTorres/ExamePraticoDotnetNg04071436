import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap, RouterModule } from '@angular/router';

import { NumericFormatDirective } from '../../../directives/mask-numerica-br/mask-numerica-br.directive';
import { SeguradoService } from '../../../services/segurado/segurado-service';
import { SeguroService } from '../../../services/seguro/seguro-service';
import { Veiculo } from './../../veiculo/veiculo';
import { VeiculoService } from './../../../services/veiculo/veiculo-service';

@Component({
  selector: 'app-seguro-detalhe',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NumericFormatDirective],
  templateUrl: './seguro-detalhe.html',
  styleUrl: './seguro-detalhe.scss',
})
export class SeguroDetalhe {
  id: string | null = null;
  acao?: string;
  listaVeiculos: any[] = [];
  listaSegurados: any[] = [];

  form = new FormGroup({
    seguroId: new FormControl(0),
    seguradoId: new FormControl(''),
    veiculoId: new FormControl(''),
    lucro: new FormControl(0),
    margemSeguranca: new FormControl(0),
    dataCadastro: new FormControl(''),
    dataUltimaAlteracao: new FormControl(''),
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private seguroService: SeguroService,
    private seguradoService: SeguradoService,
    private veiculoService: VeiculoService
  ) {}

  ngOnInit(): void {
    this.iniciarTela();

    forkJoin({
      veiculos: this.veiculoService.getAll(),
      segurados: this.seguradoService.getAll(),
    }).subscribe({
      next: (sucesso) => {
        this.listaVeiculos = sucesso.veiculos;
        this.listaSegurados = sucesso.segurados;
      },
      error: (erro) => {
        this.router.navigate(['/erro'])
      },
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.acao === 'Novo') {
        this.adicionar();
        return;
      }

      this.editar();
    }
  }

  private iniciarTela() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');

      if (this.id) {
        this.alterarItem(this.id);
        return;
      }

      this.criarNovoItem();
    });
  }

  private criarNovoItem() {
    this.acao = 'Novo';
  }

  private alterarItem(id: string) {
    this.seguroService.getById(+id).subscribe({
      next: (success) => {
        this.preencherForm(success);
      },
    });
  }

  private preencherForm(item: any) {
    this.acao = 'Editar';

    this.form.setValue({
      seguroId: item?.seguradoId,
      seguradoId: item?.seguradoId,
      veiculoId: item?.veiculoId,
      lucro: item?.lucro.toFixed(2),
      margemSeguranca: item?.margemSeguranca.toFixed(2),
      dataCadastro: item?.dataCadastro,
      dataUltimaAlteracao: item?.dataUltimaAlteracao,
    });
  }

  private adicionar() {
    let seguro = this.form.value;

    this.seguroService.create(seguro).subscribe({
      next: () => {
        this.router.navigate(['/seguro']);
      },
      error: () => {
        this.router.navigate(['/erro']);
      },
    });
  }

  private editar() {
    let seguro = this.form.value;
    seguro.lucro = +(seguro.lucro)!.toString();
    seguro.margemSeguranca = +(seguro.margemSeguranca)!.toString(),

    this.seguroService.update(seguro).subscribe({
      next: () => {
        this.router.navigate(['/segurado']);
      },
      error: () => {
        this.router.navigate(['/erro']);
      },
    });
  }
}

// {
//   "seguroId": 1,
//   "seguradoId": 1,
//   "veiculoId": 2,
//   "segurado": {
//     "seguradoId": 1,
//     "nome": "Sharon Stone",
//     "cpf": "11122233344",
//     "dataNascimento": "1988-08-06T00:00:00",
//     "dataCadastro": "2025-01-01T00:00:00",
//     "dataUltimaAlteracao": null
//   },
//   "veiculo": {
//     "veiculoId": 2,
//     "valorDoVeiculo": 1230.01,
//     "marca": "vw",
//     "modelo": "modelo 1",
//     "dataCadastro": "2025-01-01T00:00:00",
//     "dataUltimaAlteracao": null
//   },
//   "lucro": "",
//   "margemSeguranca": "",
//   "dataCadastro": "2025-01-01T00:00:00",
//   "dataUltimaAlteracao": null
// }
