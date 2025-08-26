import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';

import { Erro } from './pages/erro/erro';
import { Home } from './pages/home/home';
import { PaginaNaoEncontrada } from './pages/pagina-nao-encontrada/pagina-nao-encontrada';

export function apiMatcher(segments: UrlSegment[]) {
  if (segments.length > 0 && segments[0].path === 'api') {
    return { consumed: segments }; // ignora rota /api/** (vai para proxy/backend)
  }
  return null;
}

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

  // 👇 esta rota precisa estar ANTES do coringa
  { matcher: apiMatcher, redirectTo: '' },

  // rota coringa (404)
  { path: '**', component: PaginaNaoEncontrada },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
