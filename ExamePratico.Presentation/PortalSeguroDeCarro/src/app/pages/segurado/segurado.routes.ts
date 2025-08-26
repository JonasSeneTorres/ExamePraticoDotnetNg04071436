import { Routes } from '@angular/router';

export const MenuRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./segurado').then((x) => x.Segurado),
  },
  {
    path: 'novo',
    loadComponent: () =>
      import('./segurado-detalhe/segurado-detalhe').then((x) => x.SeguradoDetalhe),
  },
  {
    path: 'editar/:id',
    loadComponent: () =>
      import('./segurado-detalhe/segurado-detalhe').then((x) => x.SeguradoDetalhe),
  }
];
