import { Routes } from '@angular/router';

export const MenuRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./veiculo').then((x) => x.Veiculo),
  },
  {
    path: 'novo',
    loadComponent: () =>
      import('./veiculo-detalhe/veiculo-detalhe').then((x) => x.VeiculoDetalhe),
  },
  {
    path: 'alterar/:id',
    loadComponent: () =>
      import('./veiculo-detalhe/veiculo-detalhe').then((x) => x.VeiculoDetalhe),
  }
];
