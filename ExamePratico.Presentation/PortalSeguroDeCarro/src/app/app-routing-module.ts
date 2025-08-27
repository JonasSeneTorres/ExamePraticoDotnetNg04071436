import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';

import { Erro } from './pages/erro/erro';
import { Home } from './pages/home/home';
import { PaginaNaoEncontrada } from './pages/pagina-nao-encontrada/pagina-nao-encontrada';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'erro', component: Erro },

  {
    path: 'segurado',
    loadChildren: () =>
      import('../app/pages/segurado/segurado.routes').then((x) => x.MenuRoutes),
  },
  {
    path: 'seguro',
    loadChildren: () =>
      import('../app/pages/seguro/seguro.routes').then((x) => x.MenuRoutes),
  },
  {
    path: 'veiculo',
    loadChildren: () =>
      import('../app/pages/veiculo/veiculo.routes').then((x) => x.MenuRoutes),
  },
  { path: '**', component: PaginaNaoEncontrada },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
