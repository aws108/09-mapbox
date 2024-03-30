import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [ //Carga de páginas mediante lazyLoad
  {
    path: 'maps',
    loadChildren: () => import('./maps/maps.module').then( m => m.MapsModule ), //1
  },
  {
    path: '**',
    redirectTo: 'maps',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// 1-> Función callback que llama maps.module.ts y con el then, cargas el módulo. Aquçi tiene acceso a todos los componentes y módulos que se usarán