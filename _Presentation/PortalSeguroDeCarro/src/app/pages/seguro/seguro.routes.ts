import { Routes } from '@angular/router';

export const MenuRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./seguro').then((x) => x.Seguro),
  },
  {
    path: 'novo',
    loadComponent: () =>
      import('./seguro-detalhe/seguro-detalhe').then((x) => x.SeguroDetalhe),
  },
  {
    path: 'alterar/:id',
    loadComponent: () =>
      import('./seguro-detalhe/seguro-detalhe').then((x) => x.SeguroDetalhe),
  }
];
