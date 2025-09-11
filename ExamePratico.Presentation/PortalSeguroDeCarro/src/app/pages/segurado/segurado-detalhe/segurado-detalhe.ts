import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';

import { SeguradoService } from './../../../services/segurado/segurado-service';

@Component({
  selector: 'app-segurado-detalhe',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './segurado-detalhe.html',
  styleUrl: './segurado-detalhe.scss',
})
export class SeguradoDetalhe implements OnInit {
  id: string | null = null;
  acao?: string;
  readonly minDate: string = new Date('1900-01-01').toISOString().split('T')[0];
  readonly maxDate: string = new Date().toISOString().split('T')[0];

  form: FormGroup = new FormGroup({
    seguradoId: new FormControl(''),
    nome: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    cpf: new FormControl('', [Validators.required, Validators.maxLength(14)]),
    idade: new FormControl(''),
    dataNascimento: new FormControl(''),
    dataCadastro: new FormControl(''),
    dataUltimaAlteracao: new FormControl(''),
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private seguradoService: SeguradoService,
  ) {}

  ngOnInit(): void {
    this.form.get('dataNascimento')?.valueChanges.subscribe((value) => {
      this.atualizarIdade(value);
    });

    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');

      if (this.id) {
        this.alterarItem(this.id);
        return;
      }

      this.criarNovoItem();
    });
  }

  private atualizarIdade(value: any) {
    const nascimento = new Date(value);
    const hoje = new Date();

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    // Ajusta se o aniversário ainda não chegou neste ano
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    this.form.patchValue({
      idade: idade,
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
    this.seguradoService.getById(+id).subscribe({
      next: (success) => {
        this.preencherForm(success);
      },
    });
  }

  private preencherForm(item: any) {
    this.acao = 'Editar';

    this.form.setValue({
      seguradoId: item?.seguradoId,
      nome: item?.nome,
      cpf: item?.cpf,
      idade: item?.idade,
      dataNascimento: item?.dataNascimento?.split('T')[0],
      dataCadastro: item?.dataCadastro?.split('T')[0],
      dataUltimaAlteracao: item?.dataUltimaAlteracao?.split('T')[0] ?? '',
    });
  }

  private adicionar() {
    let segurado = this.form.value;

    this.seguradoService.create(segurado).subscribe({
      next: () => {
        this.router.navigate(['/segurado']);
      },
      error: () => {
        this.router.navigate(['/erro']);
      },
    });
  }

  private editar() {
    let segurado = this.form.value;

    this.seguradoService.update(segurado).subscribe({
      next: () => {
        this.router.navigate(['/segurado']);
      },
      error: () => {
        this.router.navigate(['/erro']);
      },
    });
  }
}
