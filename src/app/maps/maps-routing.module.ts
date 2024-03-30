import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';

import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';

const routes: Routes = [ //rutas hijas dentro de MapsModule
  {
    path: '', // 1
    component: MapsLayoutComponent,
    children: [
      { path: 'fullscreen', component: FullScreenPageComponent },
      { path: 'zoom-range', component: ZoomRangePageComponent },
      { path: 'markers', component: MarkersPageComponent },
      { path: 'properties', component: PropertiesPageComponent },
      { path: '**', redirectTo: 'fullscreen' }, // Es la página por defecto, pongas lo que pongas en la URL
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule { }


/* 1 -> Cuando accedes a yourdomain.com/maps, se carga MapsLayoutComponent y, a partir de ahí, se configuran rutas hijas:

yourdomain.com/maps/fullscreen cargará FullScreenPageComponent.
yourdomain.com/maps/zoom-range cargará ZoomRangePageComponent.
yourdomain.com/maps/markers cargará MarkersPageComponent.
yourdomain.com/maps/properties cargará PropertiesPageComponent.
Cualquier otro path no reconocido bajo yourdomain.com/maps/* será redirigido a yourdomain.com/maps/fullscreen debido a la ruta comodín configurada en las rutas hijas.

AppRoutingModule (Rutas Principales)
|
|-- '/maps' [Lazy Load: MapsModule]
|    |
|    |-- MapsRoutingModule (Rutas Hijas dentro de MapsModule)
|         |
|         |-- '' (ruta base del MapsModule)
|         |    |
|         |    |-- '/fullscreen' -> Carga FullScreenPageComponent
|         |    |-- '/zoom-range' -> Carga ZoomRangePageComponent
|         |    |-- '/markers' -> Carga MarkersPageComponent
|         |    |-- '/properties' -> Carga PropertiesPageComponent
|         |    |-- '**' (cualquier otra ruta no reconocida) -> Redirige a '/fullscreen'
|
|-- '**' (cualquier otra ruta no reconocida) -> Redirige a '/maps'


*/