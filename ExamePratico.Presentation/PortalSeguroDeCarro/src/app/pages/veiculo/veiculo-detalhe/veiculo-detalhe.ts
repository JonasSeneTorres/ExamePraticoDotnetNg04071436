import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CurrencyMaskDirective } from '../../../directives/currency-mask.directive';
import { formatNumberToCurrency } from '../../../utilitaries/parseNumberToCurrent';
import { parseCurrencyToNumber } from '../../../utilitaries/parseCurrentyToNumber';
import { VeiculoService } from '../../../services/veiculo/veiculo-service';

@Component({
  selector: 'app-veiculo-detalhe',
  imports: [CommonModule, ReactiveFormsModule, CurrencyMaskDirective],
  templateUrl: './veiculo-detalhe.html',
  styleUrl: './veiculo-detalhe.scss'
})
export class VeiculoDetalhe {
  form: FormGroup = new FormGroup({
    veiculoId: new FormControl(''),
    valorDoVeiculo: new FormControl(''),
    marca: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    modelo: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    dataCadastro: new FormControl(''),
    dataUltimaAlteracao: new FormControl(''),
  });
  id: string | null = null;
  acao?: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private veiculoService: VeiculoService,
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
    console.log(parseCurrencyToNumber(veiculo.valorDoVeiculo))
    veiculo.valorDoVeiculo = parseCurrencyToNumber(veiculo.valorDoVeiculo);

    this.veiculoService.update(veiculo).subscribe({
      next: () => {
        this.router.navigate(['/segurado']);
      },
      error: () => {},
    });
  }
}

