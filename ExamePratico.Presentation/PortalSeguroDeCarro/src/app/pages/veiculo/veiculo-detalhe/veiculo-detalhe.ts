import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

import { formatNumberToCurrency } from '../../../utilitaries-function/parseNumberToCurrent';
import { MaskDinheiroBrDirective } from '../../../directives/mask-dinheiro-br/mask-dinheiro-br.directive';
import { parseCurrencyToNumber } from '../../../utilitaries-function/parseCurrentyToNumber';
import { VeiculoService } from '../../../services/veiculo/veiculo-service';

@Component({
  selector: 'app-veiculo-detalhe',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, MaskDinheiroBrDirective],
  templateUrl: './veiculo-detalhe.html',
  styleUrl: './veiculo-detalhe.scss',
})
export class VeiculoDetalhe {
  id: string | null = null;
  acao?: string;

  form: FormGroup = new FormGroup({
    veiculoId: new FormControl(''),
    valorDoVeiculo: new FormControl(''),
    marca: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    modelo: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    dataCadastro: new FormControl(''),
    dataUltimaAlteracao: new FormControl(''),
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private veiculoService: VeiculoService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');

      if (this.id) {
        this.alterarItem(this.id);
        return;
      }

      this.criarNovoItem();
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

  private criarNovoItem() {
    this.acao = 'Novo';
  }

  private alterarItem(id: string) {
    this.veiculoService.getById(+id).subscribe({
      next: (success) => {
        this.preencherForm(success);
      },
    });
  }

  private preencherForm(item: any) {
    this.acao = 'Editar';

    this.form.setValue({
      veiculoId: item?.veiculoId,
      valorDoVeiculo: formatNumberToCurrency(item?.valorDoVeiculo),
      marca: item?.marca,
      modelo: item?.modelo,
      dataCadastro: item?.dataCadastro?.split('T')[0],
      dataUltimaAlteracao: item?.dataUltimaAlteracao?.split('T')[0] ?? '',
    });
  }

  private adicionar() {
    let veiculo = this.form.value;
    veiculo.valorDoVeiculo = parseCurrencyToNumber(veiculo.valorDoVeiculo);

    this.veiculoService.create(veiculo).subscribe({
      next: () => {
        this.router.navigate(['/veiculo']);
      },
      error: () => {},
    });
  }

  private editar() {
    let veiculo = this.form.value;
    veiculo.valorDoVeiculo = parseCurrencyToNumber(veiculo.valorDoVeiculo);

    this.veiculoService.update(veiculo).subscribe({
      next: () => {
        this.router.navigate(['/veiculo']);
      },
      error: () => {
        this.router.navigate(['/erro']);
      },
    });
  }
}
